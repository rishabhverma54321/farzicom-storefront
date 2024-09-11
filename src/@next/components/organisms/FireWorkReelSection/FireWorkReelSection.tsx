import React, { useEffect } from "react";
import styles from "./index.module.scss";

export interface IFireWorkReelSectionProps {
  sectionHeader?: string | React.ReactNode;
  componentType: "embedFeed" | "storyblock";
  channel: string;
  playlist?: string;
  mode?: "row" | "grid" | "pinned";
  autoplay?: boolean;
  hashtag?: string;
  pip_navigate?: boolean;
  player_fullscreen?: string;
  playerProps?: {
    player_margin: string;
    player_captions: string;
    player_more_menu: string;
  };
}

export const FireWorkReelSection: React.FC<IFireWorkReelSectionProps> = ({
  sectionHeader,
  componentType,
  channel,
  playlist,
  autoplay,
  hashtag,
  player_fullscreen,
  mode,
  pip_navigate,
  playerProps = {},
}) => {
  const renderComponent = () => {
    switch (componentType) {
      case "embedFeed":
        return (
          <fw-embed-feed
            channel={channel}
            playlist={playlist || "x"}
            mode={mode || "row"}
            autoplay={autoplay}
            branding="false"
            hashtag={hashtag}
            pip_navigate={pip_navigate}
            {...playerProps}
          />
        );
      case "storyblock":
        return (
          <fw-storyblock
            channel={channel}
            autoplay={autoplay}
            mode={mode || "pinned"}
            player_fullscreen={player_fullscreen || "true"}
            hashtag={hashtag}
            branding="false"
            playlist={playlist || "x"}
            pip_navigate={pip_navigate}
            {...playerProps}
          />
        );
      default:
        return <></>;
    }
  };
  return (
    <div className={styles.wrapper}>
      {sectionHeader && <h3 className={styles.header}>{sectionHeader}</h3>}
      {renderComponent()}
    </div>
  );
};
FireWorkReelSection.displayName = "FireWorkReelSection";
export default FireWorkReelSection;
