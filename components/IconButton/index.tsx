import {
  TrashIcon,
  PencilIcon,
  PlusIcon,
  CheckIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from '@heroicons/react/solid';

const iconMap: any = {
  trash: TrashIcon,
  pencil: PencilIcon,
  plus: PlusIcon,
  check: CheckIcon,
  question: QuestionMarkCircleIcon,
  x: XIcon,
};

const colorsMap: any = {
  red: 'text-red-500',
  blue: 'text-blue-500',
  green: 'text-green-500',
  yellow: 'text-yellow-500',
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
      <Icon className={`h-6 w-6 m-2 bg-gray-100 ${mappedColor}`} />
    </button>
  );
};

export default IconButton;
