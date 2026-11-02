import networkBasic from '@/assets/diagrams/network-basic.svg'
import type { Lesson } from '@/types'

export const networkAGiris: Lesson = {
  id: 'lesson-network-a-giris',
  slug: 'network-a-giris',
  moduleId: 'mod-network',
  title: 'Network-a giriş',
  description: 'Şəbəkənin əsas anlayışları: cihazlar, komponentlər və IP ünvanı.',
  order: 1,
  pages: [
    {
      id: 'what-is-a-network',
      type: 'text',
      title: 'Şəbəkə nədir?',
      blocks: [
        {
          type: 'paragraph',
          content: ['Kompüter şəbəkəsi bir-biri ilə məlumat mübadiləsi edə bilən cihazların birləşməsidir. Bu cihazlar kompüter, telefon, printer, server və ya ', { type: 'em', text: 'router' }, ' ola bilər.'],
        },
        {
          type: 'paragraph',
          content: ['Cihazlar şəbəkədə fayl paylaşmaq, veb saytlara daxil olmaq, mesaj göndərmək və ümumi xidmətlərdən istifadə etmək üçün əlaqə qurur.'],
        },
        { type: 'heading', text: 'Əlaqə necə qurulur?' },
        {
          type: 'paragraph',
          content: ['Cihazlar məlumatı kiçik hissələrlə göndərir. Bu hissələrə ', { type: 'strong', text: 'paket' }, ' (packet) deyilir. Hər paketdə məlumatla yanaşı, onun haradan gəldiyini və hara getməli olduğunu göstərən ünvan məlumatları da olur.'],
        },
        {
          type: 'note',
          title: 'Niyə vacibdir?',
          content: ['Məlumat şəbəkə üzərindən hərəkət edir. Onun yolunu və bu yolda hansı cihazların iştirak etdiyini anlamaq şəbəkə təhlükəsizliyinin ilk addımıdır.'],
        },
      ],
    },
    {
      id: 'network-components',
      type: 'diagram',
      title: 'Şəbəkənin əsas komponentləri',
      src: networkBasic,
      alt: 'Sxem: Client cihazı Switch-ə, Switch Router-ə, Router isə Internet-ə birləşir.',
      description:
        'Client istifadəçinin cihazıdır. Switch eyni lokal şəbəkədəki cihazları birləşdirir. Router fərqli şəbəkələr arasında paketləri yönləndirir və lokal şəbəkəni Internet-ə çıxarır.',
      caption: 'Sadələşdirilmiş şəbəkə sxemi',
    },
    {
      id: 'ip-address',
      type: 'text',
      title: 'IP ünvanı nədir?',
      blocks: [
        {
          type: 'paragraph',
          content: [{ type: 'strong', text: 'IP ünvanı' }, ' (IP address) şəbəkədəki cihazı təyin edən ünvandır. Poçt ünvanı məktubun hara çatdırılacağını göstərdiyi kimi, IP ünvanı da paketin hansı cihaza göndəriləcəyini göstərir.'],
        },
        {
          type: 'paragraph',
          content: ['IPv4 ünvanı nöqtə ilə ayrılmış dörd ədəddən ibarətdir, məsələn: ', { type: 'code', text: '192.168.1.10' }, '. Hər ədəd 0-dan 255-ə qədər ola bilər.'],
        },
        {
          type: 'list',
          items: [
            ['Eyni şəbəkədəki hər cihazın ünvanı fərqli olmalıdır.'],
            ['Ünvan cihaza əl ilə verilə və ya şəbəkə tərəfindən avtomatik təyin oluna bilər.'],
          ],
        },
        {
          type: 'note',
          title: 'Qeyd',
          content: [{ type: 'code', text: '192.168.x.x' }, ' kimi ünvanlar adətən yalnız lokal (özəl) şəbəkədə işlədilir və Internet-də yönləndirilmir.'],
        },
      ],
    },
    {
      id: 'ip-addr-example',
      type: 'code',
      title: 'Sadə nümunə',
      description:
        'Linux-da cihazın şəbəkə ünvanlarını göstərən əmr. O yalnız məlumatı oxuyur və heç nəyi dəyişmir. Əmri brauzerdə deyil, öz terminalında işlədəcəksən.',
      language: 'bash',
      code: '# Şəbəkə interfeyslərini və IP ünvanlarını göstərir\nip addr',
    },
    {
      id: 'check-router',
      type: 'quiz',
      title: 'Yoxlama',
      question: 'Router-in əsas vəzifəsi nədir?',
      options: [
        { id: 'a', text: 'Eyni lokal şəbəkədəki cihazları kabellə birləşdirmək' },
        { id: 'b', text: 'Fərqli şəbəkələr arasında paketləri yönləndirmək' },
        { id: 'c', text: 'Veb saytların fayllarını saxlamaq' },
        { id: 'd', text: 'İstifadəçilərin şifrələrini yadda saxlamaq' },
      ],
      correctOptionId: 'b',
      explanation:
        'Router fərqli şəbəkələri birləşdirir və paketlərin hansı istiqamətə getməli olduğunu müəyyən edir. Eyni lokal şəbəkədəki cihazları isə əsasən switch birləşdirir.',
    },
  ],
}
