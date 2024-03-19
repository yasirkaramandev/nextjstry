import { useEffect } from 'react';
import { useRouter } from 'next/router';

const LinkedInPage = () => {
  const router = useRouter();

  useEffect(() => {
    // LinkedIn profil URL'sini buraya ekleyin
    const linkedInProfileURL = 'https://www.linkedin.com/in/yasirkaraman/';

    // Sayfa yüklendiğinde belirtilen LinkedIn profiline yönlendirme
    window.location.href = linkedInProfileURL;
  }, []);

  return <div>Yönlendiriliyorsunuz...</div>; // Opsiyonel: Yönlendirme sırasında görüntülenecek bir içerik
};

export default LinkedInPage;
