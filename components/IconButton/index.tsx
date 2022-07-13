import {
  TrashIcon,
  PencilIcon,
  PlusIcon,
  CheckIcon,
  XIcon,
} from '@heroicons/react/solid';

const iconMap: any = {
  trash: TrashIcon,
  pencil: PencilIcon,
  plus: PlusIcon,
  check: CheckIcon,
  x: XIcon,
};

const colorsMap: any = {
  red: 'text-red-500',
  blue: 'text-blue-500',
  green: 'text-green-500',
};

interface Props {
  name: string;
  color: string;
  onClick: any;
}

const IconButton = (props: Props) => {
  const { name, color, onClick } = props;

  if (name === undefined || color === undefined) {
    console.error('Icon: name and color are required');
    return null;
  }

  const Icon = iconMap[name];
  const mappedColor = colorsMap[color];

  return (
    <button type="button" onClick={onClick}>
      <Icon className={`h-6 w-6 ${mappedColor}`} />
    </button>
  );
};

export default IconButton;
