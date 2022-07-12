import {
  TrashIcon,
  PencilIcon,
  PlusCircleIcon,
  CheckIcon,
  XIcon,
} from '@heroicons/react/solid';

const iconMap: any = {
  trash: TrashIcon,
  pencil: PencilIcon,
  plus: PlusCircleIcon,
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
}

const Icon = (props: Props) => {
  if (props.name === undefined || props.name === undefined) {
    console.error('Icon: name and color are required');
    return null;
  }

  const Icon = iconMap[props.name];
  const color = colorsMap[props.color];

  return <Icon className={`${color}`} />;
};

export default Icon;
