// Symphony Install+ same-page completed report controls
(function(){
  let previousBody = '';
  let currentReportFilename = 'Symphony-Install-Report.html';

  function reportStyles(){return `
    <style id="sym-report-style">
      body.sym-report-mode{background:#fff;color:#182b3f;margin:0;font-family:-apple-system,BlinkMacSystemFont,Arial,sans-serif}
      #symCompletedReport{max-width:900px;margin:auto;padding:20px}
      #symCompletedReport .report-controls{display:flex;gap:10px;flex-wrap:wrap;position:sticky;top:0;background:#fff;padding:10px 0;z-index:999}
      #symCompletedReport .report-controls button{border:0;border-radius:9px;background:#c8102e;color:#fff;padding:12px 14px;font-weight:800;font-size:15px}
      #symCompletedReport .report-controls .share{background:#082e59}
      #symCompletedReport .report-top{background:#082e59;color:#fff;border-top:7px solid #c8102e;padding:22px;border-radius:10px}
      #symCompletedReport .report-top h1{margin:0}
      #symCompletedReport h2{color:#082e59;border-bottom:2px solid #c8102e;padding-bottom:6px;margin-top:28px}
      #symCompletedReport table{width:100%;border-collapse:collapse}
      #symCompletedReport td{padding:8px 5px;border-bottom:1px solid #e1e5ea;vertical-align:top}
      #symCompletedReport td:first-child{font-weight:700;width:32%}
      #symCompletedReport .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
      #symCompletedReport .photo img,#symCompletedReport .siggrid img{width:100%;max-height:380px;object-fit:contain;border-radius:8px}
      #symCompletedReport .issueR{border:1px solid #d9dee5;border-radius:9px;padding:13px;margin:12px 0}
      #symCompletedReport .siggrid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
      @media(max-width:650px){#symCompletedReport .grid,#symCompletedReport .siggrid{grid-template-columns:1fr}}
      @media print{
        body.sym-report-mode{background:#fff}
        #symCompletedReport{max-width:none;padding:0}
        #symCompletedReport .report-controls{display:none!important}
      }
    </style>`}

  function photoSection(title, arr){
    return `<h2>${title}</h2>${arr.length ? `<div class="grid">${arr.map((p,i)=>`<div class="photo"><b>${title} ${i+1}</b><img src="${p}"></div>`).join('')}</div>` : '<p>No photos added.</p>'}`;
  }

  function makeReportHtml(){
    const f = fields();
    const safe = (f.jobNumber || 'installation-report').replace(/[^a-z0-9_-]+/gi,'-');
    currentReportFilename = `Symphony-Install-Report-${safe}.html`;
    const issueHtml = report.issues.length ? report.issues.map((x,i)=>`<div class="issueR"><h3>Issue ${i+1}: ${esc(x.type)}</h3><p><b>Priority:</b> ${esc(x.priority)}<br><b>Description:</b> ${esc(x.description)}<br><b>Action Taken:</b> ${esc(x.action)}<br><b>Outstanding:</b> ${x.outstanding?'Yes':'No'}</p><div class="grid">${x.photos.map((p,j)=>`<div class="photo"><b>Issue ${i+1} Photo ${j+1}</b><img src="${p}"></div>`).join('')}</div></div>`).join('') : '<p>No issues reported.</p>';
    return `<div id="symCompletedReport">
      <div class="report-controls"><button class="share" onclick="symShareCompletedReport()">Share Report</button><button onclick="symPrintCompletedReport()">Print / Save as PDF</button><button onclick="symBackToForm()">Back to Form</button></div>
      <div class="report-top"><h1>Symphony Install+</h1><div>Retail Display Installation Report</div></div>
      <h2>Job Details</h2><table>
        <tr><td>Job Number</td><td>${esc(f.jobNumber)}</td></tr><tr><td>Customer / Site</td><td>${esc(f.siteName)}</td></tr><tr><td>Address</td><td>${esc(f.siteAddress)}</td></tr><tr><td>Site Contact</td><td>${esc(f.contactName)}</td></tr><tr><td>Installation Date</td><td>${esc(f.installDate)}</td></tr><tr><td>Fitter</td><td>${esc(f.fitterName)}</td></tr>
      </table>
      ${photoSection('Before Installation',report.photos.before)}${photoSection('During Installation',report.photos.during)}${photoSection('Completed Installation',report.photos.completed)}
      <h2>Issues</h2>${issueHtml}
      <h2>Completion</h2><table><tr><td>Status</td><td>${esc(f.completionStatus)}</td></tr><tr><td>Fitter Comments</td><td>${esc(f.fitterComments)}</td></tr><tr><td>Customer</td><td>${esc(f.customerName)}</td></tr><tr><td>Customer Comments</td><td>${esc(f.customerComments)}</td></tr></table>
      <h2>Signatures</h2><div class="siggrid"><div><b>Fitter Signature</b><img src="${f.fitterSig}"><p>${esc(f.fitterName)}</p></div><div><b>Customer Signature</b><img src="${f.customerSig}"><p>${esc(f.customerName)}</p></div></div>
    </div>`;
  }

  window.createReport = function(){
    saveDraft(false);
    if(!previousBody) previousBody = document.body.innerHTML;
    document.body.classList.add('sym-report-mode');
    document.body.innerHTML = reportStyles() + makeReportHtml();
    window.scrollTo(0,0);
  };

  window.symPrintCompletedReport = function(){
    window.focus();
    setTimeout(function(){ window.print(); }, 50);
  };

  window.symBackToForm = function(){
    document.body.classList.remove('sym-report-mode');
    document.body.innerHTML = previousBody;
    previousBody = '';
    // Restore the saved draft into the rebuilt form.
    renderPhotos(); renderIssues(); setupSig('fitterSig'); setupSig('customerSig'); refreshDraft();
    continueDraft();
    show('review');
  };

  window.symShareCompletedReport = async function(){
    const node = document.getElementById('symCompletedReport');
    const clone = node.cloneNode(true);
    const controls = clone.querySelector('.report-controls'); if(controls) controls.remove();
    const html = '<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Symphony Install+ Report</title>'+reportStyles()+'</head><body class="sym-report-mode">'+clone.outerHTML+'</body></html>';
    const blob = new Blob([html], {type:'text/html'});
    const file = new File([blob], currentReportFilename, {type:'text/html'});
    try{
      if(navigator.share && (!navigator.canShare || navigator.canShare({files:[file]}))){
        await navigator.share({title:'Symphony Install+ Report',text:'Completed Symphony Install+ installation report',files:[file]});
        return;
      }
      const url = URL.createObjectURL(blob), a=document.createElement('a');
      a.href=url; a.download=currentReportFilename; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(()=>URL.revokeObjectURL(url),3000);
      alert('The report has been downloaded. You can attach it to Email, Messages or WhatsApp.');
    }catch(e){ if(e && e.name==='AbortError') return; alert('Sharing was not available on this browser.'); }
  };
})();