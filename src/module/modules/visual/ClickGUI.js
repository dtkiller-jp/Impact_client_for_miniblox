import { Module } from '../../module.js';
import Panel from './components/Panel.js';
import './styles/clickgui.css';

export class ClickGUI extends Module {
	constructor() {
		super('ClickGUI', 'visual');
		this.bind = 'ArrowRight'; // Default keybind
		this.addOption('Accent Color 1', 'rgb(64, 190, 255)');
		this.addOption('Accent Color 2', 'rgb(129, 225, 255)');
		this.addOption('Button Color', 'rgb(40, 40, 40, 0.9)');
		this.addOption('Hover Color', 'rgb(50, 50, 50, 0.9)');
		this.addOption('Header Color', 'rgb(0, 0, 0, 0.85)');
		this.addOption('Panel Color', 'rgb(18, 18, 18)');
		this.addOption('Transparent Panels', false);
		this.addOption('Enabled Indicator', '#00ffa3');
		this.addOption('Text Color', '#ffffff');
		this.addOption('Enable Animations', true);
		this.addOption('Animation Intensity', 1);

		this.GUILoaded = false;
		this.panels = [];
		this.blurredBackground = null;
		this.updateColors();
	}

	onOptionsChanged() {
		this.updateColors();
		this.updateAnimations();
	}

	updateColors() {
		const accent1 = this.options['Accent Color 1'].value;
		const accent2 = this.options['Accent Color 2'].value;
		document.documentElement.style.setProperty('--trollium-accent-color', `linear-gradient(90deg, ${accent1} 0%, ${accent2} 100%)`);
		document.documentElement.style.setProperty('--button-color', this.options['Button Color'].value);
		document.documentElement.style.setProperty('--hover-color', this.options['Hover Color'].value);
		document.documentElement.style.setProperty('--header-bg', this.options['Header Color'].value);
		const transparent = !!this.options['Transparent Panels'].value;
		const panelBg = transparent ? 'rgba(18, 18, 18, 0.35)' : this.options['Panel Color'].value;
		document.documentElement.style.setProperty('--panel-bg', panelBg);
		document.documentElement.style.setProperty('--text-color', this.options['Text Color'].value);
		document.documentElement.style.setProperty('--animation-scale', this.options['Animation Intensity'].value);
		document.documentElement.style.setProperty('--enabled-indicator', this.options['Enabled Indicator'].value);
	}

	updateAnimations() {
		if (this.options['Enable Animations'].value) {
			document.body.classList.add('with-animations');
		} else {
			document.body.classList.remove('with-animations');
		}
	}

	onEnable() {
		document.pointerLockElement && document.exitPointerLock();

		if (!this.GUILoaded) {
			this.setupBackground();
			this.createPanels();
			this.setupEventListeners();
			this.GUILoaded = true;
			this.updateAnimations();
		} else {
			this.showGUI();
			this.updateAnimations();
		}
	}

	onDisable() {
		this.hideGUI();
	}

	setupBackground() {
		this.blurredBackground = document.createElement("div");
		this.blurredBackground.className = "gui-background";
		this.blurredBackground.style.display = "none";
		document.body.appendChild(this.blurredBackground);
	}

	createPanels() {
		const categories = {
			'Combat': { top: '50px', left: '50px' },
			'Movement': { top: '50px', left: '270px' },
			'Visual': { top: '50px', left: '490px' },
			'Misc': { top: '50px', left: '710px' }
		};

		Object.keys(categories).forEach(category => {
			const panel = new Panel(category, categories[category]);
			this.panels.push(panel);

			const modules = window.moduleManager.getModulesByCategory(category.toLowerCase());
			modules.forEach(module => {
				// Include ClickGUI itself so colors can be configured
				panel.addButton(module);
			});
		});
	}

	setupEventListeners() {
		document.addEventListener('keydown', (e) => {
			if (e.code === 'Escape') {
				this.toggle();
			}
		});
	}

	showGUI() {
		this.blurredBackground.style.display = "block";
		this.panels.forEach(panel => panel.show());
	}

	hideGUI() {
		this.blurredBackground.style.display = "none";
		this.panels.forEach(panel => panel.hide());
	}
}
