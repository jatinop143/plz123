"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {  SignOutButton } from "@clerk/clerk-react";
const LogoutCard = () => {
  const [open, setOpen] = useState(false);

  const handleConfirmLogout = async () => {
    setOpen(false);
  };

  return (
    <div className="md:flex md:items-center md:justify-center h-screen w-100  md:bg-gradient-to-br from-blue-50 to-indigo-100 sm:bg-transparent ">
      <div className="p-8 bg-white rounded-2xl shadow-2xl text-center max-w-sm w-full border border-gray-200 mt-40">
        <h1 className="text-2xl font-extrabold text-gray-800">
          Ready to Leave?
        </h1>
        <p className="text-gray-600 mt-3 text-sm">
          Click the button below to confirm your logout and have a great day
          ahead!
        </p>

        <div className="mt-6">
          <Button
            onClick={() => setOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:shadow-lg"
          >
            <LogOut className="mr-2" /> Logout
          </Button>
        </div>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="rounded-lg border-2 border-red-500">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-red-600">
              Confirm Logout
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to logout? You will need to log back in to
              continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100">
              Cancel
            </AlertDialogCancel>

            <SignOutButton>
              <AlertDialogAction
                onClick={handleConfirmLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Yes, Logout
              </AlertDialogAction>
            </SignOutButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LogoutCard;
