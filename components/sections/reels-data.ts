export type ReelItem = {
  id: string
  title: string
  videoUrl: string
  posterUrl: string
  views: string
  services?: string[]
}

export const reelsData: ReelItem[] = [
  {
    id: "detailing",
    title: "Detailing premium - proces i efekt wow",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    posterUrl: "/reel-1.jpg",
    views: "1.2M wyświetleń",
    services: ["Auto Detailing", "Social Video"],
  },
  {
    id: "interiors",
    title: "Architektura i wnetrza - metamorfoza przestrzeni",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    posterUrl: "/reel-2.jpg",
    views: "864K wyświetleń",
    services: ["Architektura", "Performance"],
  },
  {
    id: "events",
    title: "Branza eventowa - promocja wydarzenia",
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    posterUrl: "/reel-3.jpg",
    views: "2.3M wyświetleń",
    services: ["Eventy", "Video Ads"],
  },
]
