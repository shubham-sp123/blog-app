import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-10">
                <div className="flex flex-wrap gap-y-8">
                    
                    {/* Brand */}
                    <div className="w-full md:w-1/2 lg:w-4/12">
                        <div className="flex flex-col gap-4">
                            <Logo />
                            <p className="text-sm text-gray-500 max-w-xs">
                                &copy; {new Date().getFullYear()} DevUI.  
                                All rights reserved.
                            </p>
                        </div>
                    </div>

                    {/* Company */}
                    <div className="w-1/2 md:w-1/4 lg:w-2/12">
                        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            <li><Link className="footer-link" to="/">Features</Link></li>
                            <li><Link className="footer-link" to="/">Pricing</Link></li>
                            <li><Link className="footer-link" to="/">Affiliate Program</Link></li>
                            <li><Link className="footer-link" to="/">Press Kit</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="w-1/2 md:w-1/4 lg:w-2/12">
                        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Support
                        </h3>
                        <ul className="space-y-3">
                            <li><Link className="footer-link" to="/">Account</Link></li>
                            <li><Link className="footer-link" to="/">Help</Link></li>
                            <li><Link className="footer-link" to="/">Contact Us</Link></li>
                            <li><Link className="footer-link" to="/">Customer Support</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="w-full md:w-1/2 lg:w-4/12">
                        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            <li><Link className="footer-link" to="/">Terms & Conditions</Link></li>
                            <li><Link className="footer-link" to="/">Privacy Policy</Link></li>
                            <li><Link className="footer-link" to="/">Licensing</Link></li>
                        </ul>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer
