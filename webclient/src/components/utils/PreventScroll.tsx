import React, { useState, useEffect } from 'react';

interface PreventScrollProps {
  inputIds: string[];
  children: React.ReactNode;
}

function PreventScroll({ inputIds, children }: PreventScrollProps) {
  const [isInputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    function handleFocus() {
      setInputFocused(true);
      disableScroll();
    }

    function handleBlur() {
      setInputFocused(false);
      enableScroll();
    }

    const inputElements = inputIds.map((id) => document.getElementById(id)!);

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener('focus', handleFocus);
      inputElement.addEventListener('blur', handleBlur);
    });

    return () => {
      inputElements.forEach((inputElement) => {
        inputElement.removeEventListener('focus', handleFocus);
        inputElement.removeEventListener('blur', handleBlur);
      });
    };
  }, [inputIds]);

  function disableScroll() {
    document.body.style.overflow = 'hidden';
    document.addEventListener('touchmove', preventScroll, { passive: false });
  }

  function enableScroll() {
    document.body.style.overflow = '';
    document.removeEventListener('touchmove', preventScroll);
  }

  function preventScroll(e: TouchEvent) {
    if (isInputFocused) {
      e.preventDefault();
    }
  }

  return <div>{children}</div>;
}

export {PreventScroll};
