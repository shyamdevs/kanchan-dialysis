// Helpers shared by Gallery and Patient posts for items that may be a video.
// A video item stores the video file in `mediaUrl` with `mediaType: "video"`,
// and keeps `imageUrl` as the poster/thumbnail (auto-generated on upload).
export function getVideoUrl(item) {
  return item?.mediaType === 'video' && item?.mediaUrl ? item.mediaUrl : '';
}

export function isVideoItem(item) {
  return Boolean(getVideoUrl(item));
}

// An item can be shown if it has a photo/poster or a playable video.
export function hasDisplayableMedia(item) {
  return Boolean(item?.imageUrl || getVideoUrl(item));
}
