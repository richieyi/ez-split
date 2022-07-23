import {
  TrashIcon,
  PencilIcon,
  PlusIcon,
  CheckIcon,
  QuestionMarkCircleIcon,
  XIcon,
  DotsVerticalIcon,
} from '@heroicons/react/solid';

const iconMap: any = {
  trash: TrashIcon,
  pencil: PencilIcon,
  plus: PlusIcon,
  check: CheckIcon,
  question: QuestionMarkCircleIcon,
  x: XIcon,
  dots: DotsVerticalIcon,
};

const colorsMap: any = {
  red: 'text-red-500',
  blue: 'text-blue-500',
  green: 'text-green-500',
  yellow: 'text-yellow-500',
  black: 'text-black-500',
};

interface Props {
  name: string;
  color: string;
  onClick: any;
  className?: string;
}

const IconButton = (props: Props) => {
  const { name, color, onClick, className } = props;

  if (name === undefined || color === undefined) {
    console.error('Icon: name and color are required');
    return null;
  }

  const Icon = iconMap[name];
  const mappedColor = colorsMap[color];

  function handleClick(e: any) {
    e.stopPropagation();

    onClick(e);
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      <Icon className={`h-6 w-6 m-2 ${mappedColor}`} />
    </button>
  );
};

export default IconButton;
