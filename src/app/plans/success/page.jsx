import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { savePaymentInfo } from '@/lib/actions/payment'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail },
    metadata,
    id: sessionId,
    payment_intent,
    amount_total
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {

    const paymentInfo = {
      email: customerEmail,
      planId: metadata?.planId || 'premium',
      status: status,
      transactionId: payment_intent?.id || sessionId,
      amount: amount_total ? (amount_total / 100).toFixed(2) : '0.00'
    }

    const result = await savePaymentInfo(paymentInfo)

    console.log("payment info result", result)

    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden">

          {/* Decorative Top Accent Glow */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-blue-500 to-blue-500" />

          {/* Animated Success Badge Check */}
          <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-xl shadow-blue-500/5 animate-pulse">
            ✓
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
            Payment Successful!
          </h1>

          <p className="text-sm text-zinc-400 mb-6">
            Thank you for upgrading! Your account limits have been automatically updated.
          </p>

          {/* Details Box */}
          <div className="bg-blue-950/60 border border-blue-800/80 rounded-xl p-4 text-left text-sm space-y-3 mb-8">
            <p className="text-zinc-300 leading-relaxed">
              We appreciate your business! A confirmation email will be sent to{' '}
              <span className="text-emerald-400 font-medium break-all">{customerEmail}</span>.
            </p>

            <p className="text-xs text-zinc-500 pt-2 border-t border-zinc-800">
              Need help? Drop us a line at{' '}
              <a
                href="mailto:orders@example.com"
                className="text-blue-400 hover:underline font-medium transition-colors"
              >
                orders@example.com
              </a>
            </p>
          </div>

          {/* Action Button */}
          <Link
            href="/dashboard/founder"
            className="block w-full text-center px-6 py-3 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-all shadow-md active:scale-[0.99]"
          >
            Go to Dashboard
          </Link>

        </div>
      </div>
    )
  }
}