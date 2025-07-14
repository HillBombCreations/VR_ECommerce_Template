const footer = document.querySelector('footer');
const box = document.createElement('div');
box.innerHTML = `
  <div style="display:flex;align-items:center;justify-content:center;gap:5px;margin-top:10px;font-size:10px;">
    <img src="/siteAssets/placeHolder.png" style="width:16px;height:16px;" />
    <span style="color: var(--color-footer-text)">Powered by Vivreal</span>
  </div>
`;
footer.appendChild(box);