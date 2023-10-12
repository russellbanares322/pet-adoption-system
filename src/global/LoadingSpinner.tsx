import { Spin } from "antd";

type TSize = "small" | "large" | "default";

type LoadingSpinnerProps = {
  size: TSize;
  title: string;
};

const LoadingSpinner = ({ title, size }: LoadingSpinnerProps) => {
  return (
    <div className="flex justify-center items-center">
      <Spin tip={title} size={size}>
        <div className="content" />
      </Spin>
    </div>
  );
};

export default LoadingSpinner;
