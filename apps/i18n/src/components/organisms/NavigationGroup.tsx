import LocaleSwitcher from "../atoms/LocaleSwitcher";
import MenuButton from "../atoms/MenuButton";
import Search from "../molecules/Search";

/**
 *
 * @returns: En NavigationGroup-komponent ...
 * @example: <NavigationGroup />
 * @alias: NavigationGroup
  * @summary: Denne komponent bruges til at ...
 * @version: 1.0.0
 * @property: [...]
 * @author: Kasper Buchholtz
 *
**/

type NavigationGroupProps = {
    locale: any;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const NavigationGroup = ({ locale, isOpen, setIsOpen }: NavigationGroupProps) => {
    return (
        <div className='flex col-start-4 md:col-start-6 xl:col-start-8 gap-6 justify-end -col-end-1'>
            <LocaleSwitcher view="desktop" className='' locale={locale} />
            <Search />
            <MenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
};

export default NavigationGroup;