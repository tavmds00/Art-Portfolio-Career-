document.addEventListener('DOMContentLoaded', function() {
    var footerHTML = '<footer id="footer" class="footer-cols-layout footer-cols-layout-mobile"><div class="footer-info footer-horizon-equal footer-horizon-equal-mobile"><div class="container-fluid"><div class="footer-cols-item footer-cols-item-mobile"><div class="copyright"><a title="©2026 COPYRIGHT TOMÁS V MORENO">©2026 TOMÁS V MORENO</a></div></div><div class="footer-one-col-item footer-one-col-item-mobile"><div class="footer-social"><ul class="socialmeida clearfix"><li class="socialmeida-li"><a href="https://coyot3levtaor.substack.com/" class="socialmeida-a" rel="nofollow" title="Substack" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg></a></li></ul></div></div></div></div></footer>';

    var existing = document.getElementById('footer');
    if (existing) {
        existing.parentNode.removeChild(existing);
    }

    var target = document.getElementById('wrap-outer') || document.getElementById('wrap-all') || document.body;
    target.insertAdjacentHTML('afterend', footerHTML);
});