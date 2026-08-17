// ==UserScript==
// @name         Copy Title & URL
// @namespace    http://tampermonkey.net/
// @version      3.0.6
// @description  Copy the current page title and URL from a discreet floating button.
// @author       Jing Wang
// @license      GPL-3.0
// @match        *://*/*
// @exclude      https://fanfou.com/sharer/image*
// @exclude      https://co.gocheck.cn/*
// @exclude      http://mail.xynu.edu.cn/*
// @exclude      http://127.0.0.1:3080/*
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/539561/Copy%20Title%20%20URL.user.js
// @updateURL https://update.greasyfork.org/scripts/539561/Copy%20Title%20%20URL.meta.js
// ==/UserScript==

(function () {
    'use strict';

    const HOST_ID = 'copy-title-url-widget';

    function processTitle(title) {
        return title
            .replace('- cnBeta.COM 移动版(WAP)', '- cnBeta')
            .replace(/\((\d+\+?)\s*封私信\s*\/\s*(\d+\+?)\s*条消息\)/g, '')
            .replace(/\((\d+\+?)\s*封私信\)/g, '')
            .trim();
    }

    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        Object.assign(textarea.style, {
            position: 'fixed',
            left: '-9999px',
            opacity: '0'
        });
        document.body.appendChild(textarea);
        textarea.select();

        try {
            return document.execCommand('copy');
        } finally {
            textarea.remove();
        }
    }

    async function copyText(text) {
        if (navigator.clipboard?.writeText && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return;
        }

        if (!fallbackCopy(text)) {
            throw new Error('The browser rejected the copy command.');
        }
    }

    function mount() {
        if (!document.body || document.getElementById(HOST_ID)) return;

        const host = document.createElement('div');
        host.id = HOST_ID;
        const shadow = host.attachShadow({ mode: 'closed' });

        const style = document.createElement('style');
        style.textContent = `
            :host { all: initial; }

            .wrap {
                position: fixed;
                right: 30px;
                bottom: 30px;
                z-index: 2147483647;
                display: flex;
                align-items: center;
                gap: 10px;
                pointer-events: none;
                font-family: Inter, ui-sans-serif, system-ui, -apple-system,
                    BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", sans-serif;
            }

            .copy-button {
                pointer-events: auto;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 7px;
                min-width: 78px;
                height: 36px;
                padding: 0 16px;
                border: 1px solid rgba(110, 118, 129, 0.18);
                border-radius: 12px;
                background: rgba(248, 250, 252, 0.12);
                color: rgba(71, 85, 105, 0.56);
                box-shadow: 0 4px 18px rgba(15, 23, 42, 0.035);
                backdrop-filter: blur(7px) saturate(125%);
                -webkit-backdrop-filter: blur(7px) saturate(125%);
                cursor: pointer;
                opacity: 0.72;
                transition: opacity 160ms ease, color 160ms ease,
                    background 160ms ease, border-color 160ms ease,
                    box-shadow 160ms ease, transform 160ms ease;
                -webkit-tap-highlight-color: transparent;
            }

            .copy-button:hover,
            .copy-button:focus-visible {
                opacity: 1;
                color: rgba(30, 41, 59, 0.92);
                background: rgba(248, 250, 252, 0.72);
                border-color: rgba(100, 116, 139, 0.28);
                box-shadow: 0 8px 28px rgba(15, 23, 42, 0.10);
                outline: none;
                transform: translateY(-1px);
            }

            .copy-button:active { transform: translateY(0) scale(0.97); }

            .label {
                font-size: 13px;
                font-weight: 400;
                letter-spacing: 0.01em;
                line-height: 1;
            }

            .toast {
                pointer-events: none;
                max-width: min(280px, calc(100vw - 100px));
                padding: 8px 12px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                background: rgba(15, 23, 42, 0.82);
                color: rgba(255, 255, 255, 0.96);
                box-shadow: 0 8px 28px rgba(15, 23, 42, 0.18);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                font-size: 12px;
                font-weight: 500;
                line-height: 1.35;
                opacity: 0;
                transform: translateX(6px) scale(0.98);
                transition: opacity 160ms ease, transform 160ms ease;
            }

            .toast.show {
                opacity: 1;
                transform: translateX(0) scale(1);
            }

            @media (prefers-color-scheme: dark) {
                .copy-button {
                    opacity: 1;
                    color: rgba(163, 170, 180, 0.95);
                    background: rgba(52, 58, 66, 0.85);
                    border-color: rgba(163, 170, 180, 0.30);
                    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.26);
                }

                .copy-button:hover,
                .copy-button:focus-visible {
                    color: rgba(195, 200, 208, 0.98);
                    background: rgba(68, 76, 86, 0.88);
                    border-color: rgba(163, 170, 180, 0.36);
                    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.30);
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .copy-button, .toast { transition: none; }
            }
        `;

        const wrap = document.createElement('div');
        wrap.className = 'wrap';

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');

        const button = document.createElement('button');
        button.className = 'copy-button';
        button.type = 'button';
        button.title = '左键复制标题和网址 · 右键隐藏';
        button.setAttribute('aria-label', '复制页面标题和网址；右键隐藏按钮');
        const label = document.createElement('span');
        label.className = 'label';
        label.textContent = 'Copy';
        button.appendChild(label);

        let toastTimer;
        function showToast(message) {
            window.clearTimeout(toastTimer);
            toast.textContent = message;
            toast.classList.add('show');
            toastTimer = window.setTimeout(() => toast.classList.remove('show'), 1600);
        }

        button.addEventListener('click', async () => {
            const text = `${processTitle(document.title)}\n${window.location.href}`;
            try {
                await copyText(text);
                showToast('已复制标题和网址');
            } catch (error) {
                console.error('[Copy Title & URL] Copy failed:', error);
                showToast('复制失败，请重试');
            }
        });

        button.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            host.remove();
        });

        wrap.append(toast, button);
        shadow.append(style, wrap);
        document.body.appendChild(host);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount, { once: true });
    } else {
        mount();
    }
})();
