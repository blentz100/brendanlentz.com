import classNames from "classnames";
import ReactPlayer from "react-player/file";
import type { FilePlayerProps } from "react-player/file";

import styles from "./Video.module.css";

export type VideoProps = Partial<FilePlayerProps> & {
  src: {
    // at least one is required:
    webm?: string;
    mp4?: string;
  };
  thumbnail?: string;
  subs?: string;
  autoplay?: boolean;
  className?: string;
};

const Video = ({ src, thumbnail, subs, autoplay, className, ...rest }: VideoProps) => {
  const url = [
    src.webm && {
      src: src.webm,
      type: "video/webm",
    },
    src.mp4 && {
      src: src.mp4,
      type: "video/mp4",
    },
  ];

  const config = {
    file: {
      attributes: {
        controlsList: "nodownload",
        preload: "metadata",
        autoPlay: !!autoplay,
        muted: !!autoplay,
        loop: !!autoplay,
      },
    },
  };

  if (thumbnail) {
    // @ts-ignore
    config.file.attributes.poster = thumbnail;
  }

  if (subs) {
    // @ts-ignore
    config.file.tracks = [
      {
        kind: "subtitles",
        src: subs,
        srcLang: "en",
        label: "English",
        default: true,
      },
    ];
  }

  return (
    <div className={classNames(styles.wrapper, className)}>
      {/* @ts-ignore */}
      <ReactPlayer width="100%" height="100%" url={url} config={config} controls={!autoplay} {...rest} />
    </div>
  );
};

export default Video;
