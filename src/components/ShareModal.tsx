import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Share2, Copy, Check, QrCode, Monitor, Smartphone, BookOpen, Clock, X, ExternalLink } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Determine the best link: the current origin or fallback
  const shareUrl = typeof window !== 'undefined'
    ? (window.location.origin.includes('localhost')
        ? 'https://ais-pre-l775pxwk24g5ckd4unr7kv-707598167407.europe-west1.run.app'
        : window.location.href.split('?')[0])
    : 'https://ais-pre-l775pxwk24g5ckd4unr7kv-707598167407.europe-west1.run.app';

  useEffect(() => {
    if (isOpen && shareUrl) {
      QRCode.toDataURL(shareUrl, {
        width: 240,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      })
        .then(url => setQrDataUrl(url))
        .catch(err => console.error(err));
    }
  }, [isOpen, shareUrl]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col text-slate-100">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
              <Share2 className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Как открыть и раздать тренажёр ученикам
              </h3>
              <p className="text-xs text-slate-400">
                Работает онлайн в любом браузере без установки программ и регистрации
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs text-slate-300">
          {/* Activation Notice Banner */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3 text-amber-200">
            <span className="text-xl">🚀</span>
            <div className="space-y-1">
              <strong className="text-white text-xs block">
                Как активировать ссылку, чтобы не было ошибки «404 Page not found»:
              </strong>
              <p className="text-[11px] text-amber-200/90 leading-relaxed">
                В правом верхнем углу интерфейса <strong>Google AI Studio</strong> (вверху страницы) нажмите кнопку <strong>«Share»</strong> (Поделиться) и выберите публичный доступ. Google автоматически опубликует приложение, и эта ссылка станет доступна всем ученикам!
              </p>
            </div>
          </div>

          {/* Main Link & QR Code Box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-950 p-5 rounded-2xl border border-slate-800">
            {/* Link & Copy (7 cols) */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  1. Прямая ссылка для школьников:
                </span>
                <p className="text-xs text-slate-400 mb-2">
                  Отправьте эту ссылку в электронный журнал, Google Classroom, Telegram, VK или чат класса:
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-emerald-300 select-all focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-md shrink-0 ${
                      copied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Скопировано!' : 'Копировать'}
                  </button>
                </div>
              </div>

              {/* Devices Support */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 text-[11px]">
                  <Monitor className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Компьютеры в классе (любой браузер)</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 text-[11px]">
                  <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Смартфоны и планшеты учеников</span>
                </div>
              </div>
            </div>

            {/* QR Code (5 cols) */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
              <span className="text-[11px] font-bold text-amber-300 mb-2 flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5" />
                QR-код для проектора
              </span>
              {qrDataUrl ? (
                <div className="p-2 bg-white rounded-xl shadow-lg">
                  <img src={qrDataUrl} alt="QR-код для учеников" className="w-36 h-36 rounded-lg" />
                </div>
              ) : (
                <div className="w-36 h-36 bg-slate-800 rounded-xl animate-pulse" />
              )}
              <span className="text-[10px] text-slate-400 mt-2">
                Ученики могут навести камеру телефона на проектор или экран
              </span>
            </div>
          </div>

          {/* Quick 45-minute lesson plan */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              Готовый сценарий урока информатики на 45 минут:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-[11px]">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-indigo-400 font-bold">10 мин • Теория</div>
                <div className="text-slate-300">
                  Показ интерактивной блок-схемы и 3 золотых правил синтаксиса на проекторе.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-sky-400 font-bold">15 мин • Отладчик</div>
                <div className="text-slate-300">
                  Ученики проходят Блок 1 (трассировка в уме), сверяя шаги в пошаговом визуализаторе.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold">10 мин • Практика</div>
                <div className="text-slate-300">
                  Поиск ошибок в Блоке 2 и написание программ со скидками и четвертями в Блоке 3.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-emerald-400 font-bold">10 мин • Контроль</div>
                <div className="text-slate-300">
                  Запуск «Режима экзамена» (10 вопросов с таймером). Оценка от «2» до «5» сразу на экране!
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="border border-slate-800 bg-slate-900/50 rounded-2xl p-4 space-y-2.5">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Частые вопросы учителя:
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <strong className="text-white">Нужно ли устанавливать Python на компьютеры?</strong>
                <p className="text-slate-400 mt-0.5">
                  Нет! Приложение содержит собственный легковесный интерпретатор и выполняет весь код прямо в браузере.
                </p>
              </div>
              <div>
                <strong className="text-white">Сохраняются ли результаты ученика?</strong>
                <p className="text-slate-400 mt-0.5">
                  Да! Решённые задачи автоматически сохраняются в памяти устройства (localStorage), поэтому прогресс не теряется при перезагрузке страницы.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold cursor-pointer transition text-xs"
          >
            Понятно, закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
