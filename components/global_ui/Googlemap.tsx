'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
  AdvancedMarker,
  Pin,
} from '@vis.gl/react-google-maps';
import { Loader2, Navigation } from 'lucide-react';
import { toast } from 'sonner';

export interface LocationData {
  lat: number;
  lng: number;
  address: string;
  addressComponents: { province: string; district: string; municipality: string; city: string };
}

interface Props {
  onLocationSelect: (location: LocationData) => void;
  initialPosition?: { lat: number; lng: number };
}

const DEFAULT_CENTER = { lat: 27.7172, lng: 85.3240 };

export default function GoogleMapAddress({ onLocationSelect, initialPosition }: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
  const mapId = process.env.NEXT_PUBLIC_MAP_ID ?? '';

  return (
    <div className="absolute inset-0">
      <APIProvider apiKey={apiKey}>
        <MapInner mapId={mapId} onLocationSelect={onLocationSelect} initialPosition={initialPosition} />
      </APIProvider>
    </div>
  );
}

function useReverseGeocode() {
  const geocodingLib = useMapsLibrary('geocoding');
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  useEffect(() => {
    if (geocodingLib) geocoderRef.current = new geocodingLib.Geocoder();
  }, [geocodingLib]);

  const reverseGeocode = useCallback(
    (lat: number, lng: number): Promise<LocationData | null> => {
      return new Promise((resolve) => {
        const geocoder = geocoderRef.current;
        if (!geocoder) {
          resolve(null);
          return;
        }
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status !== 'OK' || !results?.[0]) {
            resolve(null);
            return;
          }
          const r = results.find((x) =>
            x.types.some((t) => ['street_address', 'premise', 'sublocality_level_1'].includes(t)),
          ) ?? results[0];

          const comps: Record<string, string> = {};
          r.address_components.forEach((c) => {
            if (c.types.includes('administrative_area_level_1')) comps.province = c.long_name;
            if (c.types.includes('administrative_area_level_2')) comps.district = c.long_name;
            if (c.types.includes('administrative_area_level_3')) comps.municipality = c.long_name;
            if (c.types.includes('locality')) comps.city = c.long_name;
            if ((c.types.includes('sublocality_level_1') || c.types.includes('neighborhood')) && !comps.municipality)
              comps.municipality = c.long_name;
          });
          if (!comps.city) comps.city = comps.municipality;

          resolve({
            lat,
            lng,
            address: r.formatted_address,
            addressComponents: {
              province: comps.province ?? '',
              district: comps.district ?? '',
              municipality: comps.municipality ?? '',
              city: comps.city ?? '',
            },
          });
        });
      });
    },
    [],
  );

  return { reverseGeocode, loaded: !!geocodingLib };
}

function MapInner({ mapId, onLocationSelect, initialPosition }: { mapId: string } & Props) {
  const { reverseGeocode, loaded } = useReverseGeocode();
  const mounted = useRef(true);
  const mapRef = useRef<google.maps.Map | null>(null);

  const [markerPos, setMarkerPos] = useState<{ lat: number; lng: number }>(
    initialPosition ?? DEFAULT_CENTER,
  );
  const [confirmedAddress, setConfirmedAddress] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    if (initialPosition) setMarkerPos(initialPosition);
  }, [initialPosition]);

  const updatePosition = useCallback(
    async (lat: number, lng: number) => {
      setMarkerPos({ lat, lng });
      setConfirmedAddress(null);

      if (!loaded) return;
      const result = await reverseGeocode(lat, lng);
      if (!mounted.current) return;
      if (!result) {
        toast.error('Could not detect address for this location');
        return;
      }
      setConfirmedAddress(result.address);
      onLocationSelect(result);
    },
    [loaded, reverseGeocode, onLocationSelect],
  );

  const handleLocateMe = () => {
    const map = mapRef.current;
    if (!map) return;
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported on this device');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (!mounted.current) return;
        map.panTo({ lat: coords.latitude, lng: coords.longitude });
        map.setZoom(17);
        updatePosition(coords.latitude, coords.longitude);
        setLocating(false);
      },
      (err) => {
        if (!mounted.current) return;
        setLocating(false);
        if (err.code === err.PERMISSION_DENIED) toast.error('Location permission denied');
        else if (err.code === err.TIMEOUT) toast.error('GPS timed out. Tap the map to set your pin.');
        else toast.error('Could not get location. Tap the map to set your pin.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  };

  return (
    <>
      <button
        type="button"
        aria-label="Locate my position"
        onClick={handleLocateMe}
        disabled={locating}
        className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-2.5 bg-white text-brand-dark text-xs font-bold rounded-xl shadow-lg border border-light-gray hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-60"
      >
        {locating ? <Loader2 className="size-3.5 animate-spin" /> : <Navigation className="size-3.5 text-brand-primary" />}
        <span>{locating ? 'Locating...' : 'My Location'}</span>
      </button>

      {confirmedAddress && (
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <div className="bg-white px-3 py-2 rounded-xl shadow-md border border-light-gray flex items-start gap-2">
            <span className="text-[11px] text-brand-dark font-semibold leading-relaxed">{confirmedAddress}</span>
          </div>
        </div>
      )}

      <Map
        mapId={mapId}
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={15}
        gestureHandling="greedy"
        disableDefaultUI
        className="w-full h-full"
        onClick={(e) => { if (e.detail.latLng) updatePosition(e.detail.latLng.lat, e.detail.latLng.lng); }}
      >
        <MapController
          mapRef={mapRef}
          initialPosition={initialPosition}
          loaded={loaded}
          updatePosition={updatePosition}
        />
        <AdvancedMarker
          position={markerPos}
          draggable
          onDragEnd={(e) => { if (e.latLng) updatePosition(e.latLng.lat(), e.latLng.lng()); }}
        >
          <Pin background="#eb5a2c" glyphColor="#fff" borderColor="#000" />
        </AdvancedMarker>
      </Map>
    </>
  );
}

function MapController({
  mapRef,
  initialPosition,
  loaded,
  updatePosition,
}: {
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  initialPosition?: { lat: number; lng: number };
  loaded: boolean;
  updatePosition: (lat: number, lng: number) => void;
}) {
  const map = useMap();
  const handled = useRef(false);

  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);

  useEffect(() => {
    if (!map) return;
    if (initialPosition) {
      map.panTo(initialPosition);
      map.setZoom(17);
      return;
    }
    if (!loaded || handled.current || !navigator.geolocation) return;
    handled.current = true;

    navigator.permissions?.query({ name: 'geolocation' as PermissionName })
      .then((perm) => {
        if (perm.state !== 'granted') return;
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            map.panTo({ lat: coords.latitude, lng: coords.longitude });
            map.setZoom(17);
            updatePosition(coords.latitude, coords.longitude);
          },
          () => {},
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
        );
      })
      .catch(() => {});
  }, [map, initialPosition, loaded, updatePosition, mapRef]);

  return null;
}
