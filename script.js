const toggle=document.querySelector('.menu-toggle');
const links=document.querySelector('.nav-links');
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));toggle.setAttribute('aria-label',open?'Open navigation':'Close navigation');links.classList.toggle('open',!open)});
links?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{links.classList.remove('open');toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Open navigation')}));
const themeButton=document.querySelector('.theme-toggle');
const icon=document.querySelector('.theme-icon');
const savedTheme=localStorage.getItem('portfolio-theme');
if(savedTheme==='dark'){document.body.classList.add('dark');icon.textContent='☀';themeButton.setAttribute('aria-label','Switch to light mode')}
themeButton?.addEventListener('click',()=>{const dark=document.body.classList.toggle('dark');icon.textContent=dark?'☀':'☾';themeButton.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');localStorage.setItem('portfolio-theme',dark?'dark':'light')});
document.querySelector('#year').textContent=new Date().getFullYear();

// Flip the overlapping hero portraits when the photo stack is clicked.
const photoStack=document.querySelector('.photo-stack');
photoStack?.addEventListener('click',()=>{
  const swapped=photoStack.classList.toggle('is-swapped');
  photoStack.setAttribute('aria-pressed',String(swapped));
  photoStack.setAttribute('aria-label',swapped?'Show university portrait':'Show casual portrait');
  const counter=photoStack.querySelector('.photo-stack-hint i');
  if(counter)counter.textContent=swapped?'02 / 02':'01 / 02';
});

// Open portfolio images in an accessible lightbox. The watermark exists only
// on the enlarged view, keeping all page thumbnails clean.
const imageLightbox=document.createElement('div');
imageLightbox.className='image-lightbox';
imageLightbox.setAttribute('role','dialog');
imageLightbox.setAttribute('aria-modal','true');
imageLightbox.setAttribute('aria-label','Image preview');
imageLightbox.innerHTML='<button class="image-lightbox-close" type="button" aria-label="Close image preview">×</button><figure class="image-lightbox-frame"><img alt=""><figcaption></figcaption></figure>';
document.body.append(imageLightbox);
const lightboxImage=imageLightbox.querySelector('img');
const lightboxFrame=imageLightbox.querySelector('.image-lightbox-frame');
const closeLightbox=()=>{imageLightbox.classList.remove('open');lightboxImage.removeAttribute('src');document.body.classList.remove('lightbox-open')};
const openLightbox=image=>{const source=image.currentSrc||image.src;if(!source)return;lightboxImage.src=source;lightboxImage.alt=image.alt||'Portfolio image';lightboxFrame.classList.toggle('is-watermarked',image.dataset.watermarked==='true');imageLightbox.querySelector('figcaption').textContent=image.alt||'';imageLightbox.classList.add('open');document.body.classList.add('lightbox-open');imageLightbox.querySelector('button').focus()};
document.querySelectorAll('img:not(.photo-stack-image)').forEach(image=>{image.tabIndex=0;image.setAttribute('role','button');image.setAttribute('aria-label',`Open image: ${image.alt||'portfolio image'}`)});
document.addEventListener('click',event=>{const image=event.target.closest('img');if(image?.closest('.photo-stack'))return;if(image&&!imageLightbox.contains(image)){event.preventDefault();openLightbox(image);return}if(event.target===imageLightbox||event.target.closest('.image-lightbox-close'))closeLightbox()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&imageLightbox.classList.contains('open'))closeLightbox();if((event.key==='Enter'||event.key===' ')&&event.target.matches('img')){event.preventDefault();openLightbox(event.target)}});
