const deptData=[
  {name:'Gynaecology',doctor:'Dr. Meera Joshi',avg:15,patients:[
    ['GY-041','Ananya Shah','2:05 PM', 'WAITING'],['GY-042','Priya Patil','2:20 PM','WAITING'],['GY-043','Neha Kulkarni','2:35 PM','WAITING'],['GY-044','Riya More','2:50 PM','WAITING'],['GY-045','Sana Khan','3:05 PM','WAITING'],['GY-046','Isha Deshmukh','3:20 PM','WAITING'],['GY-047','Mansi Jain','3:35 PM','WAITING']]},
  {name:'Physiotherapy',doctor:'Dr. Arjun Rao',avg:20,patients:[
    ['PH-018','Karan Joshi','2:10 PM','WAITING'],['PH-019','Rohit Singh','2:30 PM','WAITING'],['PH-020','Mehul Shah','2:50 PM','WAITING'],['PH-021','Tanvi Patil','3:10 PM','WAITING'],['PH-022','Aarav More','3:30 PM','WAITING']]},
  {name:'Psychology',doctor:'Dr. Nidhi Mehta',avg:30,patients:[
    ['PS-008','Riya Sharma','2:00 PM','WAITING'],['PS-009','Aman Khan','2:30 PM','WAITING'],['PS-010','Diya Jain','3:00 PM','WAITING']]},
  {name:'General Medicine',doctor:'Dr. Vikram Shah',avg:12,patients:[
    ['GM-071','Sahil Patil','2:00 PM','WAITING'],['GM-072','Aditi More','2:12 PM','WAITING'],['GM-073','Vivek Joshi','2:24 PM','WAITING'],['GM-074','Nisha Rao','2:36 PM','WAITING'],['GM-075','Om Kulkarni','2:48 PM','WAITING'],['GM-076','Pooja Shah','3:00 PM','WAITING'],['GM-077','Mihir Jain','3:12 PM','WAITING'],['GM-078','Sana Patil','3:24 PM','WAITING'],['GM-079','Kabir More','3:36 PM','WAITING'],['GM-080','Asha Rao','3:48 PM','WAITING'],['GM-081','Ishaan Shah','4:00 PM','WAITING'],['GM-082','Tara Joshi','4:12 PM','WAITING']]},
];
let currentEvent=null;
function openModal(id){document.getElementById(id).classList.add('show')}
function closeModal(id){document.getElementById(id).classList.remove('show')}
function toast(msg,type='success'){const t=document.getElementById('toast');t.textContent=msg;t.className='toast show '+type;setTimeout(()=>t.classList.remove('show'),3200)}
function clock(){document.getElementById('clock').textContent=new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'})}
setInterval(clock,1000);clock();

function renderDepartments(){
  const grid=document.getElementById('deptGrid');
  grid.innerHTML=deptData.map((d,i)=>`
  <article class="dept-card">
    <div class="dept-head"><div><span class="dept-icon">✚</span><div><h3>${d.name}</h3><p>${d.doctor} · ${d.avg} min avg</p></div></div><span class="queue-count">${d.patients.length} waiting</span></div>
    <div class="queue-table">
      <div class="queue-header"><span>Token</span><span>Patient</span><span>ETA</span><span>Status</span></div>
      ${d.patients.map((p,j)=>`<div class="queue-row"><span class="token-chip">${p[0]}</span><span><b>${p[1]}</b></span><span>${p[2]}</span><span class="status ${p[3].toLowerCase()}">${p[3]}</span></div>`).join('')}
    </div>
    <button class="view-queue" onclick="simulateNext(${i})">Call next patient →</button>
  </article>`).join('');
  updateMetrics();
}
function updateMetrics(){
  const total=deptData.reduce((a,d)=>a+d.patients.length,0);
  document.getElementById('totalPatients').textContent=total;
  const avg=Math.round(deptData.reduce((a,d)=>a+d.patients.length*d.avg,0)/Math.max(1,total));
  document.getElementById('avgWait').textContent=avg+' min';
}
function recalculateAll(){
  deptData.forEach(d=>d.patients.forEach((p,i)=>{
    const mins=(i+1)*d.avg;
    p[2]=new Date(Date.now()+mins*60000).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  }));
  renderDepartments(); addLog('system','Live re-forecast completed for all departments. Affected ETA cards updated.');
  document.getElementById('updateCount').textContent=Number(document.getElementById('updateCount').textContent)+deptData.length;
  toast('All department ETAs re-forecasted');
}
function simulateNext(i){
  if(!deptData[i].patients.length)return;
  const p=deptData[i].patients.shift(); renderDepartments();
  addLog('complete',`${deptData[i].name}: ${p[0]} (${p[1]}) marked as served. Queue moved forward.`);
  toast(`${p[0]} served — queue moved forward`);
}
function openEvent(type){
  currentEvent=type;
  const configs={
    cancel:{eyebrow:'EVENT 01 · CANCELLATION',title:'Patient cancellation',desc:'Remove a waiting patient. Everyone behind them receives a new ETA.',fields:`<label>Department<select id="eventDept">${deptData.map((d,i)=>`<option value="${i}">${d.name}</option>`).join('')}</select></label><label>Token to cancel<select id="eventToken"></select></label>`},
    emergency:{eyebrow:'EVENT 02 · PRIORITY INSERTION',title:'Emergency walk-in',desc:'Insert a priority patient into a department queue and immediately re-forecast the affected patients.',fields:`<label>Department<select id="eventDept">${deptData.map((d,i)=>`<option value="${i}">${d.name}</option>`).join('')}</select></label><label>Estimated emergency handling time (minutes)<input id="eventMinutes" type="number" min="1" value="20"></label><label>Priority token / ID<input id="eventPatient" value="ER-${Math.floor(100+Math.random()*900)}"></label>`},
    doctor:{eyebrow:'EVENT 03 · DOCTOR AVAILABILITY',title:'Doctor unavailable',desc:'Switch the affected queue to an alternative doctor. Patients are notified about the doctor switch.',fields:`<label>Department<select id="eventDept">${deptData.map((d,i)=>`<option value="${i}">${d.name}</option>`).join('')}</select></label><label>Alternative doctor<select id="eventDoctor"><option>Dr. Aisha Desai</option><option>Dr. Rahul Mehta</option><option>Dr. Kavya Shah</option></select></label><label>Reason (internal note)<input id="eventReason" placeholder="e.g. Doctor unavailable"></label>`}
  }[type];
  eventEyebrow.textContent=configs.eyebrow;eventTitle.textContent=configs.title;eventDescription.textContent=configs.desc;eventFields.innerHTML=configs.fields;
  if(type==='cancel'){eventDept.onchange=populateTokens;populateTokens()}
  openModal('eventModal');
}
function populateTokens(){
  const d=deptData[Number(eventDept.value)];
  eventToken.innerHTML=d.patients.map((p,i)=>`<option value="${i}">${p[0]} — ${p[1]}</option>`).join('');
}
function submitEvent(e){
  e.preventDefault();const i=Number(eventDept.value),d=deptData[i];
  if(currentEvent==='cancel'){
    const idx=Number(eventToken.value),p=d.patients.splice(idx,1)[0];
    reforecastDept(d); addLog('cancel',`${d.name}: ${p[0]} (${p[1]}) cancelled. ${d.patients.length} remaining patients received new ETA notifications.`);
    toast('Cancellation applied — queue moved forward');
  }
  if(currentEvent==='emergency'){
    const mins=Number(eventMinutes.value)||20;const id=eventPatient.value||'ER-999';
    d.patients.splice(1,0,[id,'Emergency / Priority',new Date(Date.now()+d.avg*2*60000).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}),'PRIORITY']);
    reforecastDept(d,mins);document.getElementById('emergencyCount').textContent=Number(document.getElementById('emergencyCount').textContent)+1;
    addLog('emergency',`${d.name}: ${id} inserted as priority. Affected patients notified of approximately +${mins} min disruption.`);
    toast('Emergency inserted — affected ETAs updated');
  }
  if(currentEvent==='doctor'){
    const doc=eventDoctor.value;d.doctor=doc;
    reforecastDept(d);addLog('doctor',`${d.name}: doctor switched to ${doc}. Patients in this queue notified by SMS + email.`);
    toast('Doctor switched — patients notified');
  }
  closeModal('eventModal');renderDepartments();
}
function reforecastDept(d,extra=0){
  d.patients.forEach((p,i)=>{
    const mins=(i+1)*d.avg+extra;
    p[2]=new Date(Date.now()+mins*60000).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  });
  document.getElementById('updateCount').textContent=Number(document.getElementById('updateCount').textContent)+d.patients.length;
}
function addLog(type,text){
  const log=document.getElementById('activityLog');
  const icons={cancel:'↘',emergency:'⚡',doctor:'⚕',complete:'✓',system:'↻'};
  const div=document.createElement('div');div.className='activity-item';
  div.innerHTML=`<span class="activity-icon ${type}">${icons[type]||'•'}</span><div><b>${text}</b><small>${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})} · Notifications queued</small></div>`;
  log.prepend(div);
  while(log.children.length>8)log.lastChild.remove();
}
renderDepartments();
addLog('system','Dashboard initialized. Queue forecasts are live.');
