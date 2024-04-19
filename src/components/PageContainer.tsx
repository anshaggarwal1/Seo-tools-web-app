import React, { FC, ReactNode } from "react";

type PageContainerProps = {
  title: string;
  subTitle: string;
  children: ReactNode;
};
const PageContainer: FC<PageContainerProps> = ({
  title,
  subTitle,
  children,
}) => {
  return (
    <section className="md:container">
      <div className="text-center lg:text-start space-y-6 w-full">
        <main className="text-5xl md:text-6xl font-bold">
          <h2 className="inline">{title}</h2>
        </main>
        <p className="text-[16px] md:text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          {subTitle}
        </p>
      </div>
      {children}
    </section>
  );
};

export default PageContainer;
