import { LayoutProps } from "type";

const Layout = ({ children }: LayoutProps) => {
	return <div className='layout'>{children}</div>;
};

export default Layout;
