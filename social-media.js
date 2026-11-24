(()=>{
'use strict';
const button=document.getElementById('socialMediaOpen'); if(!button)return;
const dialog=document.createElement('dialog'); dialog.style.cssText='width:min(720px,92vw);max-height:90vh;overflow:auto;border:1px solid #b6cdbd;border-radius:12px;padding:20px;color:#174c36';
dialog.innerHTML=`<div style="display:flex;align-items:center;justify-content:space-between;gap:12px"><h2 style="margin:0">Social media post</h2><button type="button" id="smClose" aria-label="Close social media report" title="Close" style="flex:none;width:36px;height:36px;padding:0;border:1px solid #174c36;border-radius:50%;background:white;color:#174c36;font-size:26px;line-height:1;display:grid;place-items:center;cursor:pointer">&times;</button></div><p id="smScope"></p><div style="display:flex;flex-wrap:wrap;gap:12px"><label>Report mode <select id="smMode"><option value="period">Reporting period</option><option value="latest">Latest sample comparison</option><option value="history">Site survey history</option></select></label><label>Survey site <select id="smSite"></select></label><label>From <input type="date" id="smFrom"></label><label>To <input type="date" id="smTo"></label><label>Overall condition <select id="smGrade"><option value="auto">Automatic (map assessment)</option><option>Not assessed</option><option>Excellent</option><option>Good</option><option>Fair</option><option>Poor</option><option>Very Poor</option></select></label><label>Overall change <select id="smTrend"><option>Not assessed</option><option>Improving</option><option>Stable</option><option>Declining</option></select></label></div><p id="smHelp"></p><p id="smMessage" role="status"></p><canvas width="1080" height="1350" style="width:100%;height:auto;display:block"></canvas><div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap"><button type="button" id="smRefresh">Update preview</button><button type="button" id="smDownload" disabled>Download PNG</button></div>`;
document.body.append(dialog); const $=id=>dialog.querySelector('#'+id), canvas=dialog.querySelector('canvas'), ctx=canvas.getContext('2d');
const dateKey=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const day=row=>{const t=sampleDateValue(row);return t?Date.parse(dateKey(new Date(t))):NaN};
const median=a=>{a=a.filter(Number.isFinite).sort((x,y)=>x-y);return a.length?(a[(a.length-1)>>1]+a[a.length>>1])/2:null};
const bands=[['<0.2','0.2-0.5','0.5-1','1-2','2-5','5-10','>10'],['<0.02','0.02-0.05','0.05-0.1','0.1-0.2','0.2-0.5','0.5-1','>1'],TURBIDITY_SCALE.map(x=>x.key)];
function bandIndex(row,i){let raw=i===0?getNitrate(row):i===1?getPhosphate(row):getTurbidity(row);let k=i===2?turbidityScaleKey(raw):normaliseRange(raw);if(i===0&&k==='0-0.2')k='<0.2';if(i===1&&k==='0-0.02')k='<0.02';const n=bands[i].indexOf(k);return n<0?NaN:n;}
function mapAssessment(r) {
  // Prefer an explicitly recorded assessment. FreshWater Watch feedback is
  // an ecological-status interpretation, not necessarily a visual assessment.
  const explicit = getField(r, "Assessment", "assessment").trim().toLowerCase();
  const feedback = getField(r,"feedback_eng", "Feedback", "feedback_core").toLowerCase();
  const text = explicit || feedback;
  // Match an actual status phrase, rather than an unrelated word in a long
  // feedback paragraph. Poor takes precedence over moderate if both appear.
  const status = explicit ||
    (feedback.match(/(?:has a|status(?: is|:)?|assessment(?: is|:)?)\s+(very poor|very good|excellent|good|moderate|fair|poor)\b/i)?.[1] || "");
  if (/^very poor\b/.test(status)) return ["Very Poor", "#c00000", "square"];
  if (/^(excellent|very good)\b/.test(status)) return ["Excellent", "#006400", "circle"];
  if (/^good\b/.test(status)) return ["Good", "#00a86b", "diamond"];
  if (/^poor\b/.test(status)) return ["Poor", "#c00000", "square"];
  if (/^(fair|moderate)\b/.test(status)) return ["Fair", "#ffd966", "triangle"];
  return ["Not yet assessed", "#777777", "circle"];
}

// For multiple samples, use the lower-quality middle recorded grade on ties.
const gradeOrder=['Very Poor','Poor','Fair','Good','Excellent'];
function aggregateAssessment(rows){const grades=rows.map(r=>gradeOrder.indexOf(mapAssessment(r)[0])).filter(i=>i>=0).sort((a,b)=>a-b);return grades.length?gradeOrder[grades[Math.floor((grades.length-1)/2)]]:'Not yet assessed';}
function exact(v){const s=String(v??'').trim();return /^[-+]?\d+(?:\.\d+)?$/.test(s)?Number(s):NaN;}
const metrics=[['Temperature','Temperature °C','°C',0],['pH','pH','',0],['Coliform Bacteria','Coliform','',-1],['Dissolved Oxygen','Dissolved Oxygen mg/L','mg/L',1],['Biochemical Oxygen Demand','BOD mg/L','mg/L',-1]];
const loadImage=src=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(Error('Cannot load '+src));im.src=src;});
let logos; let version=0;
function contrastText(hex){const rgb=hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);const l=0.2126*rgb[0]+0.7152*rgb[1]+0.0722*rgb[2];return l>0.179?'#000000':'#ffffff';}
function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(x,y,w,h);}
function text(s,x,y,size=30,color='#174c36',bold=false,max=1000){ctx.font=`${bold?'bold ':''}${size}px Arial,sans-serif`;ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(String(s),x,y,max);}
// Compact nutrient cards: shared seven-band visual scale from the map screenshot.
const nutrientCardColours=['#FBDFEB','#F8CBDF','#F6ACCD','#F286B7','#F05AA1','#D40D8C','#D40D8C'];
function nutrientCard(x,name,i,k,previous,comparisonCurrent,count,latestMode,historyMode){
 const ink='#17384b', mid=x+164;
 rect(x,380,328,328,'#fbf5f8');
 ctx.strokeStyle='#d6e1e7';ctx.lineWidth=2;ctx.strokeRect(x+1,381,326,326);
 text(name+(i===0?' (N–NO₃)':' (P–PO₄)'),mid,410,27,ink,true,300);
 const label=j=>bands[i][j].replace(/-/g,'–');
 text(k===null?'No data':label(k)+' mg/L',mid,456,36,ink,true,300);
 const status=k===null?'Not assessed':k<=1?'Low':k<=3?'Moderate':'High';
 const palette=status==='Low'?['#e0f0e6','#206b42']:status==='Moderate'?['#fff0cc','#805b12']:status==='High'?['#f8d6d6','#a52626']:['#e8ebed','#586b76'];
 rect(mid-70,485,140,34,palette[0]);text(status,mid,502,23,palette[1],true);
 const left=x+18,step=42;
 nutrientCardColours.forEach((c,j)=>rect(left+j*step,540,39,23,c));
 if(k!==null){ctx.strokeStyle=ink;ctx.lineWidth=4;ctx.strokeRect(left+k*step-3,535,45,33);}
 text('Low',x+38,584,19,ink);text('Moderate',mid,584,19,ink);text('High',x+290,584,19,ink);
 text(previous===null?'No comparison result':(historyMode?'First: ':'Previous: ')+label(previous)+' mg/L',mid,620,23,ink,false,300);
 const change=previous===null||comparisonCurrent===null?'No comparison':comparisonCurrent>previous?'↑ Higher test band':comparisonCurrent<previous?'↓ Lower test band':'→ Same test band';
 text(change,mid,651,22,ink,true,300);
 text((latestMode?'Latest':'Median')+' band · '+count+' results',mid,682,19,ink,false,300);
}
// Vector icons render consistently in both preview and exported PNG.
function metricIcon(i,x,y){
 const paths=[
 'M9 14.5V4a3 3 0 0 1 6 0v10.5a5 5 0 1 1-6 0Z',
 'M8 2h8 M10 2v8L3.5 21a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1L14 10V2 M7 16h10',
 'M9 2h4v4H9Z M8 6h6v7H8Z M10 13v3 M14 8a7 7 0 0 1 0 14 M5 18h9 M3 22h19',
 'M7 3C6 7 2 9 2 13a5 5 0 0 0 10 0C12 9 8 7 7 3Z M15 2c1 6 7 9 7 15a7 7 0 0 1-12 5',
 'M5 3h14a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z M2 12h4l3 4 6-8 4 4h3'];
 ctx.save();ctx.translate(x-12,y-12);ctx.strokeStyle='#174c36';ctx.lineWidth=2;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke(new Path2D(paths[i]));ctx.restore();
}
function logo(im,x,y,w,h){const scale=Math.min(w/im.width,h/im.height);ctx.drawImage(im,x+(w-im.width*scale)/2,y+(h-im.height*scale)/2,im.width*scale,im.height*scale);}
const fmt=n=>Number(n.toFixed(2)).toString();
async function render(){const token=++version; $('smDownload').disabled=true;try{
const latestMode=$('smMode').value==='latest',historyMode=$('smMode').value==='history',site=$('smSite').value,D=86400000;
$('smFrom').disabled=$('smTo').disabled=latestMode||historyMode;
$('smHelp').textContent=(historyMode?'All dated surveys at one site; changes compare first and latest available measurements.':latestMode?'Latest two distinct sample timestamps at the selected site.':'Comparison: immediately preceding period of equal length.')+' Overall condition uses the map assessment unless manually overridden.';
$('smScope').textContent=site==='all'?'All sites':site;
const all=filterFreshwaterForSite(freshwaterDataAll,site);
let now,prev,periodLabel,comparisonLabel,surveyCount;
// Compare distinct timestamps, using all valid readings at each endpoint.
function endpoints(rows,read){const groups=new Map();for(const row of rows){const t=sampleDateValue(row),v=read(row);if(!Number.isFinite(t)||!Number.isFinite(v))continue;if(!groups.has(t))groups.set(t,[]);groups.get(t).push(v);}const times=[...groups.keys()].sort((a,b)=>a-b);return times.length>=2?[groups.get(times[0]),groups.get(times.at(-1))]:[[],[]];}

if(historyMode){
 if(site==='all')throw Error('Select an individual survey site for site survey history.');
 now=all.filter(r=>Number.isFinite(sampleDateValue(r))&&sampleDateValue(r)>0);
 const times=[...new Set(now.map(sampleDateValue))].sort((a,b)=>a-b);
 if(!times.length)throw Error('No dated samples at this site.');
 surveyCount=times.length;prev=[];
 const label=t=>new Date(t).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
 periodLabel=label(times[0])+' – '+label(times.at(-1));comparisonLabel='First to latest available measurements';
}else if(latestMode){
 if(site==='all')throw Error('Select an individual survey site for latest sample comparison.');
 const times=[...new Set(all.map(sampleDateValue).filter(t=>Number.isFinite(t)&&t>0))].sort((a,b)=>b-a);
 if(!times.length)throw Error('No dated samples at this site.');
 now=all.filter(r=>sampleDateValue(r)===times[0]);prev=times.length>1?all.filter(r=>sampleDateValue(r)===times[1]):[];
 const label=t=>new Date(t).toLocaleString('en-GB',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
 periodLabel='Sample: '+label(times[0]);comparisonLabel=times.length>1?'Previous sample: '+label(times[1]):'No previous sample';
}else{
 const from=Date.parse($('smFrom').value),to=Date.parse($('smTo').value);
 if(!Number.isFinite(from)||!Number.isFinite(to)||to<from)throw Error('Select a valid date range.');
 now=all.filter(r=>day(r)>=from&&day(r)<=to);prev=all.filter(r=>day(r)>=from-(to-from+D)&&day(r)<from);
 periodLabel=`${$('smFrom').value} – ${$('smTo').value}`;comparisonLabel=`Previous period: ${new Date(from-(to-from+D)).toISOString().slice(0,10)} to ${new Date(from-D).toISOString().slice(0,10)}`;
}
if(!now.length)throw Error('No samples in the selected period.');
const common=new Set(now.map(r=>siteKeyForFocus(siteName(r))).filter(k=>prev.some(r=>siteKeyForFocus(siteName(r))===k)));const matched=a=>historyMode?a:a.filter(r=>common.has(siteKeyForFocus(siteName(r))));
logos=logos||await Promise.all([loadImage('social-media/qpt-logo.png'),loadImage('social-media/urbanwise-logo.jpg')]);if(token!==version)return;
rect(0,0,1080,1350,'#f6f9f5');rect(0,0,1080,180,'#174c36');text('CANAL WATCH',540,52,56,'white',true);text(historyMode?'Grand Union Canal · Site survey history':'Grand Union Canal · Water quality update',540,108,31,'white');text(periodLabel,540,150,26,'white');
const automatic=$('smGrade').value==='auto', grade=automatic?aggregateAssessment(now):$('smGrade').value, gc=({'Excellent':'#006400','Good':'#00a86b','Fair':'#ffd966','Poor':'#c00000','Very Poor':'#c00000'})[grade]||'#777777';rect(36,200,1008,160,gc);const gradeInk=contrastText(gc);text(automatic?'OVERALL CONDITION · MAP ASSESSMENT':'OVERALL CONDITION · MANUAL OVERRIDE',540,230,24,gradeInk);text(grade.toUpperCase(),540,280,48,gradeInk,true);text($('smTrend').value,540,333,27,gradeInk);
['Nitrate','Phosphate','Turbidity'].forEach((name,i)=>{const x=36+i*340;const a=now.map(r=>bandIndex(r,i)).filter(Number.isFinite).sort((a,b)=>a-b);const k=a.length?a[Math.floor((a.length-1)/2)]:null;if(i<2){const middle=rows=>{const v=rows.map(r=>bandIndex(r,i)).filter(Number.isFinite).sort((a,b)=>a-b);return v.length?v[Math.floor((v.length-1)/2)]:null;};const ends=historyMode?endpoints(now,r=>bandIndex(r,i)):null;const midBand=v=>v.length?v.slice().sort((a,b)=>a-b)[Math.floor((v.length-1)/2)]:null;nutrientCard(x,name,i,k,historyMode?midBand(ends[0]):middle(matched(prev)),historyMode?midBand(ends[1]):middle(matched(now)),a.length,latestMode,historyMode);return;}const bg=k===null?'#e6f0e8':i===2?turbidityBandColour(bands[i][k]):nutrientBandColour(name,bands[i][k]);const fg=contrastText(bg);rect(x,380,328,328,bg);text(name,x+164,425,35,fg,true);text(k===null?'No data':bands[i][k],x+164,520,52,fg,true,300);text(i===2?'NTU':'mg/L',x+164,568,28,fg);text(latestMode?'Latest result band':'Median result band',x+164,620,24,fg);text(`${a.length} results`,x+164,665,25,fg);});
text(historyMode?'CHANGES SINCE FIRST RECORDED MEASUREMENT':latestMode?'CHANGES SINCE PREVIOUS SAMPLE':'CHANGES SINCE PREVIOUS PERIOD',540,746,31,'#174c36',true);
const nrows=matched(now).map(normaliseAdditionalRow),prows=matched(prev).map(normaliseAdditionalRow);
metrics.forEach(([name,key,unit,good],i)=>{const x=36+i*204;rect(x,780,192,192,'#e9efeb');metricIcon(i,x+96,807);const labels=i===2?['Coliform','Bacteria']:i===3?['Dissolved','Oxygen']:i===4?['Biochemical','Oxygen Demand']:[name];labels.forEach((label,j)=>text(label,x+96,labels.length===1?837:829+j*19,20,'#174c36',true,180));let a=nrows.map(r=>exact(getField(r,key))).filter(Number.isFinite),b=prows.map(r=>exact(getField(r,key))).filter(Number.isFinite);if(historyMode){[b,a]=endpoints(now,r=>exact(getField(normaliseAdditionalRow(r),key)));}const av=median(a),bv=median(b);if(a.length<(latestMode||historyMode?1:2)||b.length<(latestMode||historyMode?1:2)){text('Insufficient',x+96,869,22,'#65736b');text('data',x+96,896,22,'#65736b');}else{const d=Math.round((av-bv)*100)/100;const c=d===0?'#65736b':good===0?'#356785':Math.sign(d)===good?'#21834c':'#b52222';text(d>0?'↑':d<0?'↓':'→',x+96,872,34,c,true);text(`${d>0?'+':''}${fmt(d)} ${unit}`,x+96,909,26,c,true,180);}text(`n: ${a.length} / ${b.length}`,x+96,946,19);});
text(historyMode?`${surveyCount} surveys · ${now.length} sample records`:`${now.length} samples · ${new Set(now.map(r=>siteKeyForFocus(siteName(r)))).size} sites`,540,1006,29,'#174c36',true);text(site==='all'?'All selected sites':site,540,1041,25);text(historyMode?'First to latest available · n = latest / first':latestMode?comparisonLabel:'Changes: medians at shared sites; n = current / previous',540,1075,22);text('Community-led monitoring · Not a statutory classification',540,1105,22);
rect(0,1130,1080,220,'white');text('WORKING IN PARTNERSHIP',540,1157,24,'#174c36',true);logo(logos[0],120,1176,300,132);logo(logos[1],660,1176,300,132);text('www.queensparktrust.org/what-we-do/canal-watch',270,1327,21,'#174c36',false,500);text('urbanwise.london',810,1327,21,'#174c36',false,500);
$('smMessage').textContent=comparisonLabel+(historyMode?`. ${surveyCount} surveys.`:`. ${common.size} shared sites.`);$('smDownload').disabled=false;
}catch(e){if(token===version)$('smMessage').textContent=e.message;}}
button.addEventListener('click',()=>{const select=$('smSite');select.replaceChildren(new Option('All sites','all'));const sites=new Map();freshwaterDataAll.forEach(r=>sites.set(siteKeyForFocus(siteName(r)),siteName(r)));[...sites.values()].sort((a,b)=>a.localeCompare(b)).forEach(n=>select.add(new Option(n,n)));select.value=sites.get(siteKeyForFocus(currentFocusedSite))||'all';const rows=filterFreshwaterForSite(freshwaterDataAll,select.value);const dates=rows.map(day).filter(Number.isFinite);const latest=dates.length?new Date(Math.max(...dates)):new Date();$('smTo').value=latest.toISOString().slice(0,10);$('smFrom').value=$('smTo').value.slice(0,8)+'01';$('smScope').textContent=currentFocusedSite==='all'?'All sites':currentFocusedSite;dialog.showModal();render();});
$('smRefresh').onclick=render;dialog.querySelectorAll('input,select').forEach(el=>el.addEventListener('change',render));$('smClose').onclick=()=>dialog.close();
const outsideDialog=e=>{const r=dialog.getBoundingClientRect();return e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom);};
let backdropDown=false;dialog.addEventListener('pointerdown',e=>{backdropDown=outsideDialog(e);});dialog.addEventListener('pointercancel',()=>{backdropDown=false;});dialog.addEventListener('click',e=>{if(backdropDown&&outsideDialog(e))dialog.close();backdropDown=false;});$('smDownload').onclick=()=>canvas.toBlob(blob=>{if(!blob)return;const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`canal-watch-${$('smMode').value==='history'?'history-'+$('smSite').value.replace(/[^a-z0-9]+/gi,'-'):$('smMode').value==='latest'?'latest-'+$('smSite').value.replace(/[^a-z0-9]+/gi,'-'):$('smTo').value}.png`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);},'image/png');
})();
