from pathlib import Path
import re
p=Path('index.html')
s=p.read_text()
old_controls='<div class=\\"controls\\"><button class=\\"share\\" onclick=\\"shareReport()\\">Share Report</button><button onclick=\\"openPrintPage()\\">Print</button><button onclick=\\"saveToDevice()\\">Save to Device</button><button onclick=\\"returnToApp()\\">Close</button></div>'
new_controls='<div class=\\"controls\\"><button class=\\"share\\" onclick=\\"window.opener&&window.opener.shareGeneratedReport?window.opener.shareGeneratedReport(document.documentElement.outerHTML,\'${safe}\'):alert(\'Sharing is unavailable.\')\\">Share Report</button><button onclick=\\"window.print()\\">Print / Save as PDF</button><button onclick=\\"window.opener&&window.opener.saveGeneratedReport?window.opener.saveGeneratedReport(document.documentElement.outerHTML,\'${safe}\'):alert(\'Saving is unavailable.\')\\">Save to Device</button><button onclick=\\"window.close()\\">Close</button></div>'
if old_controls not in s:
    raise SystemExit('Expected report controls not found; refusing to alter file')
s=s.replace(old_controls,new_controls,1)
pattern=r'<script>function printReport\(\)\{.*?<\\/script>'
s2,n=re.subn(pattern,'',s,count=1,flags=re.S)
if n!=1:
    raise SystemExit('Embedded report script not found; refusing to alter file')
s=s2
marker='function createReport(){'
helpers="""function cleanGeneratedReport(html){try{const d=new DOMParser().parseFromString(html,'text/html'),c=d.querySelector('.controls');if(c)c.remove();return '<!doctype html>'+d.documentElement.outerHTML}catch(e){return html}}\nfunction saveGeneratedReport(html,safe){try{const clean=cleanGeneratedReport(html),blob=new Blob([clean],{type:'text/html'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Symphony-Install-Report-'+safe+'.html';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000)}catch(e){alert('The report could not be saved on this browser.')}}\nasync function shareGeneratedReport(html,safe){try{const clean=cleanGeneratedReport(html),blob=new Blob([clean],{type:'text/html'}),file=new File([blob],'Symphony-Install-Report-'+safe+'.html',{type:'text/html'});if(navigator.share&&(!navigator.canShare||navigator.canShare({files:[file]}))){await navigator.share({title:'Symphony Install+ Report',text:'Completed Symphony Install+ installation report',files:[file]});return}const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=file.name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);alert('The report has been downloaded. Attach it to Email, Messages or WhatsApp.')}catch(e){if(e&&e.name==='AbortError')return;alert('The report could not be shared on this browser.')}}\n"""
if marker not in s:
    raise SystemExit('createReport marker not found; refusing to alter file')
s=s.replace(marker,helpers+marker,1)
p.write_text(s)
