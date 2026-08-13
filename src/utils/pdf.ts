import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';
import { InstallationReport, PhotoItem, SignatureData } from '../types/report';

const esc = (value?: string) =>
  (value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const photosHtml = (title: string, photos: PhotoItem[]) => {
  if (!photos.length) return `<h2>${esc(title)}</h2><p>No photos added.</p>`;
  return `
    <h2>${esc(title)}</h2>
    <div class="photoGrid">
      ${photos.map((p, i) => p.base64 ? `
        <div class="photo">
          <div class="photoLabel">${esc(title)} ${i + 1}</div>
          <img src="data:image/jpeg;base64,${p.base64}" />
        </div>` : '').join('')}
    </div>`;
};

const signatureHtml = (signature?: SignatureData) => {
  if (!signature?.paths?.length) return '<div class="noSig">No signature captured</div>';
  return `
    <svg viewBox="0 0 ${signature.width} ${signature.height}" preserveAspectRatio="xMidYMid meet">
      ${signature.paths.map(d => `<path d="${d}" stroke="#062746" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}
    </svg>`;
};

export async function createAndSharePdf(report: InstallationReport) {
  const issues = report.issues.length
    ? report.issues.map((issue, idx) => `
      <div class="issue">
        <h3>Issue ${idx + 1}: ${esc(issue.type)}</h3>
        <table>
          <tr><td>Priority</td><td>${esc(issue.priority)}</td></tr>
          <tr><td>Description</td><td>${esc(issue.description || 'Not entered')}</td></tr>
          <tr><td>Action Taken</td><td>${esc(issue.actionTaken || 'Not entered')}</td></tr>
          <tr><td>Outstanding</td><td>${issue.outstanding ? 'Yes' : 'No'}</td></tr>
        </table>
        <div class="photoGrid">
          ${issue.photos.map((p, pIdx) => p.base64 ? `
            <div class="photo">
              <div class="photoLabel">Issue ${idx + 1} Photo ${pIdx + 1}</div>
              <img src="data:image/jpeg;base64,${p.base64}" />
            </div>` : '').join('')}
        </div>
      </div>
    `).join('')
    : '<p>No issues reported.</p>';

  const html = `
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body{font-family:-apple-system,BlinkMacSystemFont,Arial,sans-serif;padding:28px;color:#15293F}
      .top{background:#082E59;color:#fff;padding:22px;border-radius:10px;border-top:7px solid #D71920}
      .brand{font-size:17px;font-weight:700;margin-bottom:5px}.title{font-size:29px;font-weight:800;margin:0}
      .meta{margin-top:10px;font-size:14px}
      h2{color:#082E59;border-bottom:2px solid #D71920;padding-bottom:6px;margin-top:28px}
      h3{color:#082E59;margin-bottom:8px}
      table{width:100%;border-collapse:collapse}td{padding:8px 5px;border-bottom:1px solid #E1E5EA;vertical-align:top}
      td:first-child{font-weight:700;width:32%}
      .photoGrid{display:flex;flex-wrap:wrap;gap:10px}.photo{width:47%;page-break-inside:avoid;margin-bottom:12px}
      .photo img{width:100%;max-height:300px;object-fit:contain;border-radius:7px}
      .photoLabel{font-size:10px;font-weight:700;margin-bottom:4px}
      .issue{border:1px solid #D9DEE5;border-radius:9px;padding:13px;margin-bottom:14px;page-break-inside:avoid}
      .sigGrid{display:flex;gap:20px}.sigBox{width:48%}.signature{height:145px;border:1px solid #D9DEE5;border-radius:8px}
      .signature svg{width:100%;height:100%}.noSig{padding:50px 10px;color:#777;text-align:center}
      .comments{border:1px solid #D9DEE5;border-radius:8px;padding:12px;min-height:50px}
      .footer{margin-top:32px;border-top:1px solid #D9DEE5;padding-top:8px;font-size:10px;color:#777}
    </style>
  </head>
  <body>
    <div class="top">
      <div class="brand">Symphony Install+</div>
      <div class="title">Retail Display Installation Report</div>
      <div class="meta">${esc(report.reportNumber)}${report.jobNumber ? ` • Job ${esc(report.jobNumber)}` : ''}${report.storeName ? ` • ${esc(report.storeName)}` : ''}</div>
    </div>

    <h2>Job Details</h2>
    <table>
      <tr><td>Report Number</td><td>${esc(report.reportNumber)}</td></tr>
      <tr><td>Job Number / Reference</td><td>${esc(report.jobNumber || 'Not entered')}</td></tr>
      <tr><td>Store / Site Name</td><td>${esc(report.storeName || 'Not entered')}</td></tr>
      <tr><td>Site Address</td><td>${esc(report.siteAddress || 'Not entered')}</td></tr>
      <tr><td>Site Contact</td><td>${esc(report.contactName || 'Not entered')}</td></tr>
      <tr><td>Installation Date</td><td>${esc(report.installationDate)}</td></tr>
    </table>

    ${photosHtml('Before Installation', report.beforePhotos)}
    ${photosHtml('During Installation', report.duringPhotos)}
    ${photosHtml('Completed Installation', report.completedPhotos)}

    <h2>Issues</h2>
    ${issues}

    <h2>Completion & Sign-Off</h2>
    <table>
      <tr><td>Completion Status</td><td>${esc(report.completionStatus)}</td></tr>
      <tr><td>Fitter</td><td>${esc(report.fitterName || 'Not entered')}</td></tr>
      <tr><td>Fitter Comments</td><td>${esc(report.fitterComments || 'None')}</td></tr>
      <tr><td>Customer</td><td>${esc(report.customerName || 'Not entered')}</td></tr>
    </table>

    <h3>Customer Comments</h3>
    <div class="comments">${esc(report.customerComments || 'None')}</div>

    <div class="sigGrid">
      <div class="sigBox">
        <h3>Fitter Signature</h3>
        <div class="signature">${signatureHtml(report.fitterSignature)}</div>
        <p>${esc(report.fitterName)}</p>
      </div>
      <div class="sigBox">
        <h3>Customer Signature</h3>
        <div class="signature">${signatureHtml(report.customerSignature)}</div>
        <p>${esc(report.customerName)}</p>
      </div>
    </div>

    <div class="footer">
      Symphony Install+ • Report generated ${new Date().toLocaleString('en-GB')}
    </div>
  </body>
  </html>`;

  try {
    const { uri } = await Print.printToFileAsync({ html });
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        UTI: 'com.adobe.pdf',
        dialogTitle: `Share ${report.jobNumber || report.reportNumber}`,
      });
    } else {
      Alert.alert('PDF created', `The PDF was created at ${uri}`);
    }
  } catch (error) {
    Alert.alert('Could not create PDF', error instanceof Error ? error.message : 'Unknown error');
  }
}
