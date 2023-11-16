const animateCSS = (element: string, animation: string, prefix = 'animate__') =>
  new Promise<void>((resolve) => {
      const animationName = `${prefix}${animation}`;
      const node = document.querySelector<HTMLElement>(element);

      if (node) {
        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event: AnimationEvent) {
          event.stopPropagation();
          node!.classList.remove(`${prefix}animated`, animationName);
          resolve();
        }

        node.addEventListener('animationend', handleAnimationEnd, { once: true });
      } 
  });

export { animateCSS };
