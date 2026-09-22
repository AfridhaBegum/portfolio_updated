document.getElementById('year').textContent = new Date().getFullYear();

  gsap.registerPlugin(ScrollTrigger);

  /* ---- mobile menu toggle ---- */
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  let navOpen = false;

  function setMobileNav(open){
    navOpen = open;
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
    mobileNav.style.display = 'block';
    gsap.to(mobileNav, {
      height: open ? mobileNav.scrollHeight : 0,
      duration: 0.35, ease: 'power2.out',
      onComplete: () => { if(!open) mobileNav.style.display = 'none'; }
    });
  }

  menuBtn.addEventListener('click', () => setMobileNav(!navOpen));
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMobileNav(false)));
  window.addEventListener('resize', () => { if(window.innerWidth >= 700 && navOpen) setMobileNav(false); });

  /* ---- infinite skills marquee ---- */
  const track = document.getElementById('marqueeTrack');
  track.innerHTML += track.innerHTML; // duplicate for seamless loop
  const marqueeTween = gsap.to(track, {
    xPercent: -50, duration: 22, ease: 'none', repeat: -1
  });
  track.parentElement.addEventListener('mouseenter', () => marqueeTween.timeScale(0.15));
  track.parentElement.addEventListener('mouseleave', () => marqueeTween.timeScale(1));

  /* ---- hero entrance timeline (single orchestrated sequence) ---- */
  const tl = gsap.timeline({defaults:{ease:'power3.out'}});

  tl.from('.eyebrow-line', {opacity:0, y:10, duration:0.5})
    .from('h1.headline .line span', {yPercent:110, duration:0.7, stagger:0.12}, '-=0.2')
    .from('.hero-sub', {opacity:0, y:14, duration:0.6}, '-=0.35')
    .from('.cta-row .btn', {opacity:0, y:14, duration:0.5, stagger:0.1}, '-=0.3')
    .from('.social-row a', {opacity:0, duration:0.4, stagger:0.06}, '-=0.25')
    .from('#codePanel', {opacity:0, x:24, duration:0.7}, '-=0.9');

  /* ---- typing effect inside the code panel ---- */
  const codeLines = [
    "const engineer = {",
    "  name: <span class='str'>'Afridha Begum'</span>,",
    "  background: <span class='str'>'ECE'</span>,",
    "  focus: <span class='str'>'DSA in Java'</span>,",
    "  status: <span class='str'>'open to work'</span>,",
    "};",
    "",
    "<span class='cmt'>// always shipping something new</span>"
  ];

  function typeCode(){
    const el = document.getElementById('codeText');
    el.innerHTML = '';
    const caret = document.createElement('span');
    caret.className = 'caret';
    let lineIndex = 0;

    function nextLine(){
      if(lineIndex >= codeLines.length){
        el.appendChild(caret);
        gsap.to(caret, {opacity:0, duration:0.5, repeat:-1, yoyo:true});
        return;
      }
      const lineEl = document.createElement('div');
      lineEl.innerHTML = codeLines[lineIndex];
      lineEl.style.opacity = 0;
      el.appendChild(lineEl);
      gsap.to(lineEl, {opacity:1, duration:0.25, onComplete:() => {
        lineIndex++;
        setTimeout(nextLine, 90);
      }});
    }
    setTimeout(nextLine, 900);
  }
  typeCode();

  /* ---- scroll-triggered section reveals ---- */
  gsap.utils.toArray('section .sec-head').forEach((el) => {
    gsap.from(el, {
      opacity:0, y:24, duration:0.7, ease:'power2.out',
      scrollTrigger:{trigger:el, start:'top 85%'}
    });
  });

  gsap.from('.about-grid > *', {
    opacity:0, y:24, duration:0.7, stagger:0.15, ease:'power2.out',
    scrollTrigger:{trigger:'.about-grid', start:'top 82%'}
  });

  gsap.utils.toArray('.skill-group').forEach((group) => {
    gsap.from(group.querySelectorAll('.chip'), {
      opacity:0, y:10, duration:0.4, stagger:0.05, ease:'power2.out',
      scrollTrigger:{trigger:group, start:'top 88%'}
    });
  });

  gsap.from('.proj-card', {
    opacity:0, y:30, duration:0.7, stagger:0.12, ease:'power2.out',
    scrollTrigger:{trigger:'.proj-grid', start:'top 82%'}
  });

  gsap.from('.contact-box', {
    opacity:0, y:24, duration:0.7, ease:'power2.out',
    scrollTrigger:{trigger:'.contact-box', start:'top 85%'}
  });
