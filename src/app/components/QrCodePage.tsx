/** PNG at this path encodes https://grantgeist.com/card — regenerate if /card URL changes. */
const QR_IMAGE_SRC = "/assets/grant_geist_card_qr.png";

/**
 * Scan-first layout for in-person scanning. Open grantgeist.com/qr on your phone
 * and hold it up; the code encodes /card (digital business card).
 */
export function QrCodePage() {
  return (
    <main
      className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#0B0E14] px-3 py-4 sm:px-4 sm:py-6"
    >
      <div className="flex w-full max-w-[min(92vw,32rem)] flex-col items-center text-center">
        <div className="w-full rounded-lg bg-white p-3 sm:p-4">
          <img
            src={QR_IMAGE_SRC}
            alt="QR code linking to Grant Geist's digital business card"
            width={512}
            height={512}
            className="mx-auto h-auto w-full"
          />
        </div>

        <h1 className="mt-4 text-lg font-semibold tracking-tight text-white sm:text-xl">
          Scan to connect
        </h1>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Save my contact info
        </p>

        <a
          href="/card"
          className="mt-4 text-xs font-medium text-[#0066cc] transition-colors hover:text-[#0052a3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0E14] sm:text-sm"
        >
          View Card
        </a>
      </div>
    </main>
  );
}
