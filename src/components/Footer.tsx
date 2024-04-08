const Footer = () => {
   return (
      <div className="diff aspect-[16/9] h-[50px] fixed bottom-0 left-0 right-0">
         <div className="diff-item-1">
            <div className="bg-primary text-primary-content text-md font-bold grid place-content-center">
               Frontend: React 18, Typescript, Effector, Daisyui, Tailwind
            </div>
         </div>
         <div className="diff-item-2">
            <div className="bg-base-200 text-md font-bold grid place-content-center">
               Backend: NestJS, Mongodb, Typescript, @nestjs/jwt(2 токена)
            </div>
         </div>
         <div className="diff-resizer"></div>
      </div>
   );
};

export default Footer;
