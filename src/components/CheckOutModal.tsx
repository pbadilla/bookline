"use client";

import { formatPrice } from "@/lib/utils";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  subtotal: number;
  discount: number;
  total: number;
  onConfirm: () => void;
}

export function CheckoutModal({
  open,
  onClose,
  subtotal,
  discount,
  total,
  onConfirm,
}: CheckoutModalProps) {
  if (!open) return null; // Modal hidden when not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" data-testid="checkout-modal-overlay">
      {/* Modal content */}
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg animate-fade-in" data-testid="checkout-modal">
        <h2 className="text-xl font-bold" data-testid="checkout-modal-title">Confirm Checkout</h2>
        <p className="mt-2 text-sm text-muted-foreground" data-testid="checkout-modal-description">
          Please review your order summary before proceeding.
        </p>

        <div className="mt-4 space-y-2" data-testid="checkout-modal-summary">
          <div className="flex justify-between text-sm" data-testid="checkout-subtotal">
            <span>Subtotal</span>
            <span data-testid="checkout-subtotal-value">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm" data-testid="checkout-discount">
            <span>Discount</span>
            <span className={discount > 0 ? "text-green-600" : "text-muted-foreground"} data-testid="checkout-discount-value">
              {discount > 0
                ? `-${formatPrice(discount)} (${((discount / subtotal) * 100).toFixed(0)}%)`
                : formatPrice(0)}
            </span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold text-lg" data-testid="checkout-total">
            <span>Total</span>
            <span data-testid="checkout-total-value">{formatPrice(total)}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-2" data-testid="checkout-modal-buttons">
          <button
            data-testid="checkout-modal-cancel"
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            data-testid="checkout-modal-confirm"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            onClick={onConfirm}
          >
            Confirm Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
