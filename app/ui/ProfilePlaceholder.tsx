import { UserCircleIcon } from "@heroicons/react/24/outline";

export function ProfilePlaceholder() {
  return (
    <div className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center">
       <UserCircleIcon className="w-6 h-6"></UserCircleIcon> 
    </div>
  );
}
