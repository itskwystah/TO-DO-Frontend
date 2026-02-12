import React from "react";

interface TermsAndConditionProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}

const TermsAndCondition: React.FC<TermsAndConditionProps> = ({
  isOpen,
  onClose,
  onAgree,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-380px max-w-[90%] bg-[#D9AFA1] rounded-3xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-center mb-4">
          Terms and Condition
        </h2>

        <div className="text-sm text-center leading-relaxed text-black space-y-3 max-h-200px overflow-y-auto px-2">
          <p>
            By using this To-Do application, users agree to these Terms and
            Conditions.
          </p>
          <p>
            The app is made to help users create and manage tasks for personal
            use.
          </p>
          <p>
            Users are responsible for the information they enter and must not
            use the app for illegal or harmful activities.
          </p>
          <p>
            Users may need an account and are responsible for keeping their
            login details secure.
          </p>
          <p>
            The app may collect basic user data to work properly and will not
            share it with others unless required by law.
          </p>
          <p>
            The application may be updated or temporarily unavailable. It is
            provided “as is,” and the developer is not responsible for lost
            data or missed tasks.
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              onAgree();
              onClose();
            }}
            className="px-10 py-2 rounded-full bg-[#C9B8AF] hover:bg-[#b9a79e] transition font-medium shadow-md"
          >
            I agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndCondition;
