export interface Wallpaper {
  url: string;
  name: string;
  liked: boolean;
  suggested: boolean;
  library: boolean;
}

type FullWallpaper = Wallpaper;

export function useWallpapers(): Wallpaper[] {
  return [
    {
      url: "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg",
      name: "TechGarden",
      liked: Math.random() < 0.5,
      suggested: Math.random() < 0.5,
      library: Math.random() < 0.5,
    },
    {
      url: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg",
      name: "QuantumPeak",
      liked: Math.random() < 0.5,
      suggested: Math.random() < 0.5,
      library: Math.random() < 0.5,
    },
    {
      url: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg",
      name: "CyberDawn",
      liked: Math.random() < 0.5,
      suggested: Math.random() < 0.5,
      library: Math.random() < 0.5,
    },
    {
      url: "https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg",
      name: "DigitalOasis",
      liked: Math.random() < 0.5,
      suggested: Math.random() < 0.5,
      library: Math.random() < 0.5,
    },
    {
      url: "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg",
      name: "BinaryForest",
      liked: Math.random() < 0.5,
      suggested: Math.random() < 0.5,
      library: Math.random() < 0.5,
    },
    {
      url: "https://images.pexels.com/photos/1144687/pexels-photo-1144687.jpeg",
      name: "NeuraMoss",
      liked: Math.random() < 0.5,
      suggested: Math.random() < 0.5,
      library: Math.random() < 0.5,
    },
    {
      url: "https://images.pexels.com/photos/1743165/pexels-photo-1743165.jpeg",
      name: "SynthFlow",
      liked: Math.random() < 0.5,
      suggested: Math.random() < 0.5,
      library: Math.random() < 0.5,
    },
    {
      url: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg",
      name: "DataPeak",
      liked: Math.random() < 0.5,
      suggested: Math.random() < 0.5,
      library: Math.random() < 0.5,
    },
    {
      url: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg",
      name: "PixelStorm",
      liked: Math.random() < 0.5,
      suggested: Math.random() < 0.5,
      library: Math.random() < 0.5,
    },
    {
      url: "https://images.pexels.com/photos/1693095/pexels-photo-1693095.jpeg",
      name: "TechMatrix",
      liked: Math.random() < 0.5,
      suggested: Math.random() < 0.5,
      library: Math.random() < 0.5,
    },
    {
      url: "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg",
      name: "BioVerse",
      liked: Math.random() < 0.5,
      suggested: Math.random() < 0.5,
      library: Math.random() < 0.5,
    },
    {
      url: "https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg",
      name: "SynthAurora",
      liked: Math.random() < 0.5,
      suggested: Math.random() < 0.5,
      library: Math.random() < 0.5,
    },
    {
      url: "https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg",
      name: "QuantumFlow",
      liked: Math.random() < 0.5,
      suggested: Math.random() < 0.5,
      library: Math.random() < 0.5,
    },
    {
      url: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg",
      name: "CircuitLeaf",
      liked: Math.random() < 0.5,
      suggested: Math.random() < 0.5,
      library: Math.random() < 0.5,
    },
    {
      url: "https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg",
      name: "SiliconSands",
      liked: Math.random() < 0.5,
      suggested: Math.random() < 0.5,
      library: Math.random() < 0.5,
    },
  ];
}

export function useSuggestedWallpapers(): FullWallpaper[] {
  const wallpapers = useWallpapers();
  return wallpapers.filter((wallpaper) => wallpaper.suggested);
}

export function useLikedWallpapers(): FullWallpaper[] {
  const wallpapers = useWallpapers();
  return wallpapers.filter((wallpaper) => wallpaper.liked);
}

export function useLibraryWallpapers(): FullWallpaper[] {
  const wallpapers = useWallpapers();
  return wallpapers.filter((wallpaper) => wallpaper.library);
}
