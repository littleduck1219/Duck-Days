import { LayoutProps } from "type";
import MenuList from "./Menu";

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className='layout'>
			{children}
			<MenuList />
		</div>
	);
};

export default Layout;
