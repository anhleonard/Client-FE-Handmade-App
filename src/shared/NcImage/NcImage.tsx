import Image, { ImageProps } from "next/image";

export interface NcImageProps extends Omit<ImageProps, "alt"> {
  containerClassName?: string;
  alt?: string;
}

const NcImage = ({
  containerClassName = "",
  alt = "nc-image",
  className = "object-cover w-full h-full",
  ...args
}: NcImageProps) => {
  return (
    <div className={containerClassName}>
      <Image className={className} alt={alt} {...args} />
    </div>
  );
};

export default NcImage;
