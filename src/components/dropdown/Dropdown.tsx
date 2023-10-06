type DropdownItems = {
  name: string;
  action: () => void;
  icon: React.ReactElement;
};

type DropdownProps = {
  dropdownItems: DropdownItems[];
  onClose: () => void;
  open: boolean;
};

const Dropdown = ({ dropdownItems, onClose, open }: DropdownProps) => {
  return (
    <div
      className={`absolute top-7 right-4 bg-white z-30 rounded-sm shadow-md ${
        !open && "scale-0"
      } duration-300 ease-in-out`}
    >
      <ul className="p-1 w-max">
        {dropdownItems.map((item, index) => (
          <li
            className="cursor-pointer py-1 px-2 hover:bg-dark-blue hover:text-white duration-75 ease-in-out rounded-sm flex items-center gap-2 justify-start"
            onClick={() => {
              item.action();
              onClose();
            }}
            key={index}
          >
            {item.icon}
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
