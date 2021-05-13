import { Component, EventEmitter, Output, ViewChild, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, transition, animate, AnimationEvent } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';
import { AppConfigService } from './service/appconfigservice';
import { VersionService } from './service/versionservice';
import { AppConfig } from './domain/appconfig';
import { Subscription } from 'rxjs';

@Component({
    selector: "app-topbar",
    template: `
        <div class="header">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="header-left">
                            <div class="logo">
                                <a href="index.html"
                                    ><img
                                        src="../../../../assets/kassets/images/logo.png"
                                        alt=""
                                /></a>
                            </div>
                            <div class="menu">
                                <a class="toggleMenu" href="#"
                                    ><img
                                        src="../../../../assets/kassets/images/nav.png"
                                        alt=""
                                /></a>
                                <ul class="nav" id="nav">
                                    <li><a href="shop.html">Shop</a></li>
                                    <li><a href="team.html">Team</a></li>
                                    <li>
                                        <a href="experiance.html">Events</a>
                                    </li>
                                    <li>
                                        <a href="experiance.html">Experiance</a>
                                    </li>
                                    <li><a href="shop.html">Company</a></li>
                                    <li><a href="contact.html">Contact</a></li>
                                    <div class="clear"></div>
                                </ul>
                                <script
                                    type="text/javascript"
                                    src="../../../../assets/kassets/js/responsive-nav.js"
                                ></script>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="header_right">
                            <!-- start search-->
                            <div class="search-box">
                                <div id="sb-search" class="sb-search">
                                    <form>
                                        <input
                                            class="sb-search-input"
                                            placeholder="Enter your search term..."
                                            type="search"
                                            name="search"
                                            id="search"
                                        />
                                        <input
                                            class="sb-search-submit"
                                            type="submit"
                                            value=""
                                        />
                                        <span class="sb-icon-search"> </span>
                                    </form>
                                </div>
                            </div>
                            <!----search-scripts---->
                            <script src="../../../../assets/kassets/js/classie.js"></script>
                            <script src="../../../../assets/kassets/js/uisearch.js"></script>
                            <script>
                                new UISearch(
                                    document.getElementById("sb-search")
                                );
                            </script>
                            <!----//search-scripts---->
                            <ul class="icon1 sub-icon1 profile_img">
                                <li>
                                    <a class="active-icon c1" href="#"> </a>
                                </li>
                            </ul>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
            </div>
            <ul #topbarMenu class="topbar-menu">
                <li><a [routerLink]="['/setup']">Get Started</a></li>
                <li class="topbar-submenu">
                    <a tabindex="0" (click)="toggleMenu($event, 0)">Themes</a>
                    <ul [@overlayMenuAnimation]="'visible'" *ngIf="activeMenuIndex === 0" (@overlayMenuAnimation.start)="onOverlayMenuEnter($event)">
                        <li class="topbar-submenu-header">THEMING</li>
                        <li><a [routerLink]="['/theming']"><i class="pi pi-fw pi-file"></i><span>Guide</span></a></li>
                        <li><a href="https://www.primefaces.org/designer/primeng"><i class="pi pi-fw pi-palette"></i><span>Designer</span></a></li>
                        <li><a href="https://www.primefaces.org/designer-ng"><i class="pi pi-fw pi-desktop"></i><span>Visual Editor</span></a></li>
                        <li><a [routerLink]="['/icons']"><i class="pi pi-fw pi-info-circle"></i><span>Icons</span></a></li>
                        <li><a href="https://www.figma.com/community/file/890589747170608208"><i class="pi pi-fw pi-pencil"></i><span>Figma UI Kit</span></a></li>

                        <li class="topbar-submenu-header">BOOTSTRAP</li>
                        <li><a (click)="changeTheme($event, 'bootstrap4-light-blue', false)"><img src="assets/showcase/images/themes/bootstrap4-light-blue.svg" alt="Blue Light" /><span>Blue Light</span></a></li>
                        <li><a (click)="changeTheme($event, 'bootstrap4-light-purple', false)"><img src="assets/showcase/images/themes/bootstrap4-light-purple.svg" alt="Purple Light" /><span>Purple Light</span></a></li>
                        <li><a (click)="changeTheme($event, 'bootstrap4-dark-blue', true)"><img src="assets/showcase/images/themes/bootstrap4-dark-blue.svg" alt="Blue Dark" /><span>Blue Dark</span></a></li>
                        <li><a (click)="changeTheme($event, 'bootstrap4-dark-purple', true)"><img src="assets/showcase/images/themes/bootstrap4-dark-purple.svg" alt="Purple Dark" /><span>Purple Dark</span></a></li>

                        <li class="topbar-submenu-header">MATERIAL DESIGN</li>
                        <li><a (click)="changeTheme($event, 'md-light-indigo', false)"><img src="assets/showcase/images/themes/md-light-indigo.svg" alt="Indigo Light" /><span>Indigo Light</span></a></li>
                        <li><a (click)="changeTheme($event, 'md-light-deeppurple', false)"><img src="assets/showcase/images/themes/md-light-deeppurple.svg" alt="Deep Purple Light" /><span>Deep Purple Light</span></a></li>
                        <li><a (click)="changeTheme($event, 'md-dark-indigo', true)"><img src="assets/showcase/images/themes/md-dark-indigo.svg" alt="Indigo Dark" /><span>Indigo Dark</span></a></li>
                        <li><a (click)="changeTheme($event, 'md-dark-deeppurple', true)"><img src="assets/showcase/images/themes/md-dark-deeppurple.svg" alt="Deep Purple Dark" /><span>Deep Purple Dark</span></a></li>

                        <li class="topbar-submenu-header">MATERIAL DESIGN COMPACT</li>
                        <li><a (click)="changeTheme($event, 'mdc-light-indigo', false)"><img src="assets/showcase/images/themes/md-light-indigo.svg" alt="Indigo Light" /><span>Indigo Light</span></a></li>
                        <li><a (click)="changeTheme($event, 'mdc-light-deeppurple', false)"><img src="assets/showcase/images/themes/md-light-deeppurple.svg" alt="Deep Purple Light" /><span>Deep Purple Light</span></a></li>
                        <li><a (click)="changeTheme($event, 'mdc-dark-indigo', true)"><img src="assets/showcase/images/themes/md-dark-indigo.svg" alt="Indigo Dark" /><span>Indigo Dark</span></a></li>
                        <li><a (click)="changeTheme($event, 'mdc-dark-deeppurple', true)"><img src="assets/showcase/images/themes/md-dark-deeppurple.svg" alt="Deep Purple Dark" /><span>Deep Purple Dark</span></a></li>

                        <li class="topbar-submenu-header">FLUENT UI</li>
                        <li><a (click)="changeTheme($event, 'fluent-light', false)"><img src="assets/showcase/images/themes/fluent-light.png" alt="Fluent Light" /><span>Fluent Light</span></a></li>

                        <li class="topbar-submenu-header">PRIMEONE</li>
                        <li><a (click)="changeTheme($event, 'saga-blue', false)"><img src="assets/showcase/images/themes/saga-blue.png" alt="Saga Blue" /><span>Saga Blue</span></a></li>
                        <li><a (click)="changeTheme($event, 'saga-green', false)"><img src="assets/showcase/images/themes/saga-green.png" alt="Saga Green" /><span>Saga Green</span></a></li>
                        <li><a (click)="changeTheme($event, 'saga-orange', false)"><img src="assets/showcase/images/themes/saga-orange.png" alt="Saga Orange" /><span>Saga Orange</span></a></li>
                        <li><a (click)="changeTheme($event, 'saga-purple', false)"><img src="assets/showcase/images/themes/saga-purple.png" alt="Saga Purple" /><span>Saga Purple</span></a></li>
                        <li><a (click)="changeTheme($event, 'vela-blue', true)"><img src="assets/showcase/images/themes/vela-blue.png" alt="Vela Blue" /><span>Vela Blue</span></a></li>
                        <li><a (click)="changeTheme($event, 'vela-green', true)"><img src="assets/showcase/images/themes/vela-green.png" alt="Vela Green" /><span>Vela Green</span></a></li>
                        <li><a (click)="changeTheme($event, 'vela-orange', true)"><img src="assets/showcase/images/themes/vela-orange.png" alt="Vela Orange" /><span>Vela Orange</span></a></li>
                        <li><a (click)="changeTheme($event, 'vela-purple', true)"><img src="assets/showcase/images/themes/vela-purple.png" alt="Vela Purple" /><span>Vela Purple</span></a></li>
                        <li><a (click)="changeTheme($event, 'arya-blue', true)"><img src="assets/showcase/images/themes/arya-blue.png" alt="Arya Blue" /><span>Arya Blue</span></a></li>
                        <li><a (click)="changeTheme($event, 'arya-green', true)"><img src="assets/showcase/images/themes/arya-green.png" alt="Arya Green" /><span>Arya Green</span></a></li>
                        <li><a (click)="changeTheme($event, 'arya-orange', true)"><img src="assets/showcase/images/themes/arya-orange.png" alt="Arya Orange" /><span>Arya Orange</span></a></li>
                        <li><a (click)="changeTheme($event, 'arya-purple', true)"><img src="assets/showcase/images/themes/arya-purple.png" alt="Arya Purple" /><span>Arya Purple</span></a></li>

                        <li class="topbar-submenu-header">PREMIUM</li>
                        <li><a (click)="changeTheme($event, 'soho-light', false)"><img src="assets/showcase/images/themes/soho-light.png" alt="Soho Light" /><span>Soho Light</span></a></li>
                        <li><a (click)="changeTheme($event, 'soho-dark', true)"><img src="assets/showcase/images/themes/soho-dark.png" alt="Soho Dark" /><span>Soho Dark</span></a></li>
                        <li><a (click)="changeTheme($event, 'viva-light', false)"><img src="assets/showcase/images/themes/viva-light.svg" alt="Viva Light" /><span>Viva Light</span></a></li>
                        <li><a (click)="changeTheme($event, 'viva-dark', true)"><img src="assets/showcase/images/themes/viva-dark.svg" alt="Viva Dark" /><span>Viva Dark</span></a></li>
                        <li><a (click)="changeTheme($event, 'mira', false)"><img src="assets/showcase/images/themes/mira.jpg" alt="Mira" /><span>Mira</span></a></li>
                        <li><a (click)="changeTheme($event, 'nano', false)"><img src="assets/showcase/images/themes/nano.jpg" alt="Nano" /><span>Nano</span></a></li>

                        <li class="topbar-submenu-header">LEGACY</li>
                        <li><a (click)="changeTheme($event, 'nova', false)"><img src="assets/showcase/images/themes/nova.png" alt="Nova" /><span>Nova</span></a></li>
                        <li><a (click)="changeTheme($event, 'nova-alt', false)"><img src="assets/showcase/images/themes/nova-alt.png" alt="Nova Alt" /><span>Nova Alt</span></a></li>
                        <li><a (click)="changeTheme($event, 'nova-accent', false)"><img src="assets/showcase/images/themes/nova-accent.png" alt="Nova Accent" /><span>Nova Accent</span></a></li>
                        <li><a (click)="changeTheme($event, 'luna-amber', true)"><img src="assets/showcase/images/themes/luna-amber.png" alt="Luna Amber" /><span>Luna Amber</span></a></li>
                        <li><a (click)="changeTheme($event, 'luna-blue', true)"><img src="assets/showcase/images/themes/luna-blue.png" alt="Luna Blue" /><span>Luna Blue</span></a></li>
                        <li><a (click)="changeTheme($event, 'luna-green', true)"><img src="assets/showcase/images/themes/luna-green.png" alt="Luna Green" /><span>Luna Green</span></a></li>
                        <li><a (click)="changeTheme($event, 'luna-pink', true)"><img src="assets/showcase/images/themes/luna-pink.png" alt="Luna Pink" /><span>Luna Pink</span></a></li>
                        <li><a (click)="changeTheme($event, 'rhea', false)"><img src="assets/showcase/images/themes/rhea.png" alt="Rhea" /><span>Rhea</span></a></li>
                    </ul>
                </li>
                <li class="topbar-submenu">
                    <a tabindex="0" (click)="toggleMenu($event, 1)">Templates</a>
                    <ul [@overlayMenuAnimation]="'visible'" *ngIf="activeMenuIndex === 1" (@overlayMenuAnimation.start)="onOverlayMenuEnter($event)">
                        <li class="topbar-submenu-header">PREMIUM ADMIN TEMPLATES</li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/atlantis-ng">
                                <img alt="Atlantis" src="assets/showcase/images/layouts/atlantis-logo.svg">
                                <span>Atlantis</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/ultima-ng">
                                <img alt="Ultima" src="assets/showcase/images/layouts/ultima-logo.png">
                                <span>Ultima</span><span class="theme-badge material">material</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/freya-ng">
                                <img alt="Freya" src="assets/showcase/images/layouts/freya-logo.png">
                                <span>Freya</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/poseidon-ng">
                                <img alt="Poseidon" src="assets/showcase/images/layouts/poseidon-logo.svg">
                                <span>Poseidon</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/diamond-ng">
                                <img alt="Diamond" src="assets/showcase/images/layouts/diamond-logo.png">
                                <span>Diamond</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/mirage-ng">
                                <img alt="Mirage" src="assets/showcase/images/layouts/mirage-logo.png">
                                <span>Mirage</span><span class="theme-badge bootstrap">bootstrap</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/prestige-ng">
                                <img alt="Prestige" src="assets/showcase/images/layouts/prestige-logo.png">
                                <span>Prestige</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/sapphire-ng">
                                <img alt="Sapphire" src="assets/showcase/images/layouts/sapphire-logo.png">
                                <span>Sapphire</span><span class="theme-badge material">material</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/roma-ng">
                                <img alt="Roma" src="assets/showcase/images/layouts/roma-logo.png">
                                <span>Roma</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/babylon-ng">
                                <img alt="Babylon" src="assets/showcase/images/layouts/babylon-logo.png">
                                <span>Babylon</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/olympia-ng">
                                <img alt="Olympia" src="assets/showcase/images/layouts/olympia-logo.png">
                                <span>Olympia</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/california-ng">
                                <img alt="California" src="assets/showcase/images/layouts/california-logo.png">
                                <span>California</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/ecuador-ng">
                                <img alt="Ecuador" src="assets/showcase/images/layouts/ecuador-logo.png">
                                <span>Ecuador</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/harmony-ng">
                                <img alt="Harmony" src="assets/showcase/images/layouts/harmony-logo.png">
                                <span>Harmony</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/apollo-ng">
                                <img alt="Apollo" src="assets/showcase/images/layouts/apollo-logo.png">
                                <span>Apollo</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/serenity-ng">
                                <img alt="Serenity" src="assets/showcase/images/layouts/serenity-logo.png">
                                <span>Serenity</span><span class="theme-badge material">material</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/avalon-ng">
                                <img alt="Avalon" src="assets/showcase/images/layouts/avalon-logo.png">
                                <span>Avalon</span><span class="theme-badge bootstrap">bootstrap</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/verona-ng">
                                <img alt="Verona" src="assets/showcase/images/layouts/verona-logo.png">
                                <span>Verona</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/manhattan-ng">
                                <img alt="Manhattan" src="assets/showcase/images/layouts/manhattan-logo.png">
                                <span>Manhattan</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/paradise-ng">
                                <img alt="Paradise" src="assets/showcase/images/layouts/paradise-logo.png">
                                <span>Paradise</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/barcelona-ng">
                                <img alt="Barcelona" src="assets/showcase/images/layouts/barcelona-logo.png">
                                <span>Barcelona</span><span class="theme-badge material">material</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/morpheus-ng">
                                <img alt="Morpheus" src="assets/showcase/images/layouts/morpheus-logo.png">
                                <span>Morpheus</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/layouts/omega-ng">
                                <img alt="Omega" src="assets/showcase/images/layouts/omega-logo.png">
                                <span>Omega</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="topbar-submenu">
                    <a tabindex="0" (click)="toggleMenu($event, 2)">Resources</a>
                    <ul [@overlayMenuAnimation]="'visible'" *ngIf="activeMenuIndex === 2" (@overlayMenuAnimation.start)="onOverlayMenuEnter($event)">

                        <li><a href="https://www.primetek.com.tr" target="_blank"><span>About PrimeTek</span></a></li>
                        <li><a href="https://www.primefaces.org/store" target="_blank"><span>PrimeStore</span></a></li>
                        <li><a href="https://www.primefaces.org/category/primeng/" target="_blank"><span>Blog</span></a></li>
                        <li><a href="https://forum.primefaces.org/viewforum.php?f=35"><span>Forum</span></a></li>
                        <li><a href="https://discord.gg/gzKFYnpmCY"><span>Discord Chat</span></a></li>
                        <li><a [routerLink]="['/lts']"><span>LTS</span></a></li>
                        <li><a href="https://www.primefaces.org/newsletter" target="_blank"><span>Newsletter</span></a></li>
                        <li><a href="https://github.com/primefaces/primeng" target="_blank"><span>Source Code</span></a></li>
                        <li><a [routerLink]="['/support']"><span>Support</span></a></li>
                        <li><a href="https://twitter.com/prime_ng?lang=en" target="_blank"><span>Twitter</span></a></li>
                        <li><a href="https://www.primefaces.org/whouses" target="_blank"><span>Who Uses</span></a></li>
                    </ul>
                </li>
                <li class="topbar-submenu">
                    <a tabindex="0" (click)="toggleMenu($event, 3)">{{versions ? versions[0].version : 'Latest'}}</a>
                    <ul [@overlayMenuAnimation]="'visible'" *ngIf="activeMenuIndex === 3" (@overlayMenuAnimation.start)="onOverlayMenuEnter($event)" style="width:100%">
                        <li *ngFor="let v of versions">
                            <a [href]="v.url">{{v.version}}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    `,
    styleUrls: [
        '../../assets/kassets/css/googleapis.css',
        '../../assets/kassets/css/bootstrap.css',
        '../../assets/kassets/css/style.css',
        '../../assets/kassets/css/fwslider.css']
})
export class AppTopBarComponent implements OnInit, OnDestroy {
    @Output() menuButtonClick: EventEmitter<any> = new EventEmitter();

    activeMenuIndex: number;

    config: AppConfig;

    subscription: Subscription;

    versions: any[];

    constructor(
        private router: Router,
        private versionService: VersionService,
        private configService: AppConfigService
    ) {}

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(
            (config) => (this.config = config)
        );
        this.versionService
            .getVersions()
            .then((data) => (this.versions = data));

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.activeMenuIndex = null;
            }
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
