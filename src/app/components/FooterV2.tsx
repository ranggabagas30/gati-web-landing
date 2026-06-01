const footerMenus = [
  {
    title: 'Contact',
    links: [
      { label: 'Email', href: 'mailto:hello@gati.id' },
      { label: 'WhatsApp', href: 'https://wa.me/628978991119' },
      { label: 'Telegram', href: 'https://t.me' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'Team', href: '#about' },
      { label: 'Career', href: '#contact' },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com' },
      { label: 'Instagram', href: 'https://www.instagram.com' },
    ],
  },
];

export function FooterV2() {
  return (
    <footer id="contact" className="px-4 pb-6 md:px-10 md:pb-8 xl:px-[66px] xl:pb-[40px]">
      <div className="relative overflow-hidden rounded-[32px] bg-[#f05123] text-white shadow-[0px_16px_36px_rgba(15,15,15,0.22)] md:rounded-[44px] xl:rounded-[62px]">
        <img
          src="/images/logo/gati_logo_transparent_footer.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[65px] left-[55px] z-0 h-auto w-[calc(100%-110px)] select-none opacity-50"
        />

        <div className="relative z-10 px-6 py-10 md:px-14 md:py-12 xl:px-[117px] xl:py-[65px]">
          <div className="mx-auto max-w-[1120px] text-center">
            <div className="xl:pt-[79px]">
              <h2 className="font-['Inter'] text-[22px] font-medium leading-[30px] tracking-[0px] text-white md:text-[28px] md:leading-[36px] xl:text-[36px] xl:leading-[44px]">
                Tell us where you are today — we'll help you plan <span className="text-[#9E1919]">the next step.</span>
              </h2>
            </div>

            <div className="mt-14 grid grid-cols-1 justify-center gap-x-8 gap-y-10 text-left md:mt-16 md:grid-cols-2 md:justify-items-center xl:mt-[121px] xl:grid-cols-3 xl:justify-items-start">
              {footerMenus.map((menu) => (
                <div key={menu.title} className="w-full max-w-[220px]">
                  <h3 className="font-['Inter'] text-[18px] font-medium leading-[28px] tracking-[0px] text-white md:text-[20px] md:leading-[32px] xl:text-[24px] xl:leading-[36px]">
                    {menu.title}
                  </h3>
                  <ul className="mt-6 space-y-5 md:mt-7 md:space-y-6 xl:mt-[36px] xl:space-y-8">
                    {menu.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                          className="font-['Inter'] text-[18px] font-medium leading-[28px] tracking-[0px] text-[#F8C1B1] transition-colors duration-200 hover:text-white md:text-[20px] md:leading-[32px] xl:text-[24px] xl:leading-[36px]"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-10 border-t border-white/30 pt-6 text-left font-['Inter'] text-[20px] font-medium leading-[28px] tracking-[0px] text-[#FDE0D8] md:mt-12 md:text-[24px] md:leading-[34px] xl:hidden">
            <p>© GATI — All rights reserved</p>
          </div>

          <div className="relative mt-[72px] hidden border-t border-white/30 pt-8 text-left font-['Inter'] text-[20px] font-medium leading-[32px] tracking-[0px] text-[#FDE0D8] xl:block">
            <p>© GATI — All rights reserved</p>
            <p className="text-[#F8C1B1]">Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
