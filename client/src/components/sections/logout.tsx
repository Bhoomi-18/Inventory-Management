import { useNavigate } from 'react-router-dom';
import { Separator } from '../ui/separator';
import { LogOut } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <Separator className="my-4" />
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent text-sm font-medium text-red-500"
          >
            <LogOut className="w-4 h-4 text-red-500" />
            Logout
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to log out?</DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex gap-3 justify-end">
            <Button variant="outline">Cancel</Button>
            <Button variant="destructive" onClick={handleLogout}>
              Confirm Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LogoutButton;