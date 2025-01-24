import { checkRole } from "@/utils/roles";

import Head from "./Head";
import Logo from "./Logo";
import { MobileNav } from "./MobileNav";
import Navigation from "./Navigation";

const Header = async () => {
  const isAdmin = await checkRole("admin");

  return (
    <Head>
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />
        <Navigation />
        <MobileNav isAdmin={isAdmin} />
      </div>
    </Head>
  );
};

export default Header;
