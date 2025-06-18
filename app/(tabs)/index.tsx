import { useEffect, useState } from 'react';
import { getPin } from '../../lib/pinStore';
import { Redirect } from 'expo-router';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [hasPin, setHasPin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkPin = async () => {
      const pin = await getPin();
      setHasPin(!!pin);
      setLoading(false);
    };
    checkPin();
  }, []);

  if (loading) return null;

  if (hasPin === false) return <Redirect href="/pin-setup" />;
  if (hasPin === true) return <Redirect href="/pin-enter" />;

  return null;
}
