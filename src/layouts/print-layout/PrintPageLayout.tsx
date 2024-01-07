import { forwardRef, LegacyRef } from "react";

type PrintPageLayoutProps = {
  children: React.ReactNode;
};

const PrintPageLayout = forwardRef(
  (props: PrintPageLayoutProps, ref: LegacyRef<HTMLDivElement>) => {
    const { children } = props;

    return <div ref={ref}>{children}</div>;
  }
);

export default PrintPageLayout;
