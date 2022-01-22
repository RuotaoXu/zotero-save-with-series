Zotero.SaveWithTag = new function () {
    const _this = this;

    // Startup - initialize plugin

    this.init = function () {
        this.resetState('initial');

        // Register callbacks in Zotero as item observers
        if (this.notifierID == null)
            this.notifierID = Zotero.Notifier.registerObserver(this.notifierCallback, ['item']);
        // Unregister callback when the window closes (important to avoid a memory leak)
        window.addEventListener('unload', function (e) {
            Zotero.Notifier.unregisterObserver(_this.notifierID);
            _this.notifierID = null;
        }, false);

    };

    this.notifierCallback = {
        notify: function (event, type, ids, extraData) {
            if (type == 'item' && event == 'add') {
                _this.updateItems(Zotero.Items.get(ids), 'update');
            };
        }
    };

    /** Update logic */

    this.resetState = function (operation) {
        if (this.progressWin) {
            this.progressWin.close();
        };
        switch (operation) {
            case 'update':
                icon = 'chrome://zotero/skin/tick.png';
                resetWindow = new this.ProgressWindow();
                resetWindow.changeHeadline('Finished');
                resetWindow.progress = new resetWindow.ItemProgress(icon);
                resetWindow.progress.setProgress(100);
                resetWindow.progress.setText(this.numberOfUpdatedItems + ' of ' + this.numberOfItemsToUpdate + ' item tag(s) updated.');
                resetWindow.show();
                resetWindow.startCloseTimer(4000);
                break;
            default:
                break;
        };
        this.itemsToUpdate = null;
        this.currentItemIndex = 0;
        this.numberOfUpdatedItems = 0;
        this.numberOfItemsToUpdate = 0;
    };

    this.updateSelectedItems = function (operation) {
        this.updateItems(ZoteroPane.getSelectedItems(), operation);
    };

    function itemHasField(item, field) {
        return Zotero.ItemFields.isValidForType(Zotero.ItemFields.getID(field), item.itemTypeID);
    }

    this.updateItems = function (items, operation) {
        items = items.filter(item => item.getField('title'));

        if (items.length === 0 ||
            this.currentItemIndex < this.numberOfItemsToUpdate) {
            return;
        };

        this.resetState('initial');
        this.numberOfItemsToUpdate = items.length;
        this.itemsToUpdate = items;

        // Progress Windows
        this.progressWin = new this.ProgressWindow({ callOnClick: [] });
        let icon = 'chrome://zotero/skin/toolbar-advanced-search' + (Zotero.hiDPI ? '@2x' : '') + '.png';
        let headline = '';
        switch (operation) {
            case 'update':
                headline = 'Updating tag';
                break;
            default:
                headline = 'Default headline';
                break;
        }
        this.progressWin.changeHeadline(headline, icon);
        this.progressWin.progress = new this.progressWin.ItemProgress();
        this.progressWin.show();

        this.updateNextItem(operation);
    };

    this.updateNextItem = function (operation) {
        this.currentItemIndex++;

        if (this.currentItemIndex > this.numberOfItemsToUpdate) {
            this.resetState(operation);
            return;
        };

        // Progress Windows
        let percent = Math.round(((this.currentItemIndex - 1) / this.numberOfItemsToUpdate) * 100);
        this.progressWin.progress.setProgress(percent);
        this.progressWin.progress.setText('Update Item ' + this.currentItemIndex + ' of ' + this.numberOfItemsToUpdate);

        this.updateItem(
            this.itemsToUpdate[this.currentItemIndex - 1], operation);
    };
	this.getSeries = function(name)	{
		let series = "";
		if(name.match("3DV")){series = "3DV"}
		else if(name.match("Access")){ series = "Access";}
		else if(name.match("AAAI")){ series = "AAAI";}
		else if(name.match("ACHA")){ series = "ACHA";}
		else if(name.match("BMVC")){ series = "BMVC";}
		else if(name.match("CVPR")){ series = "CVPR";}
		else if(name.match("ECCV")){ series = "ECCV";}
		else if(name.match("ICASSP")){ series = "ICASSP";}
		else if(name.match("ICCV")){ series = "ICCV";}
		else if(name.match("ICIP")){ series = "ICIP";}
		else if(name.match("ICLR")){ series = "ICLR";}
		else if(name.match("ICME")){ series = "ICME";}
		else if(name.match("ICML")){ series = "ICML";}
		else if(name.match("IJCAI")){ series = "IJCAI";}
		else if(name.match("IJCV")){ series = "IJCV";}
		else if(name.match("IS")){ series = "IS";}
		else if(name.match("JMIV")){ series = "JMIV";}
		else if(name.match("JSC")){ series = "JSC";}
		else if(name.match("MM")){ series = "MM";}
		else if(name.match("MMS")){ series = "MMS";}
		else if(name.match("Neurocomputing")){ series = "Neurocomputing";}	  
		else if(name.match("NIPS")){ series = "NIPS";}
		else if(name.match("NN")){ series = "NN";}	  
		else if(name.match("PAMI")){ series = "PAMI";}
		else if(name.match("PR")){ series = "PR";}
		else if(name.match("RAL")){ series = "RAL";}
		else if(name.match("SIIMS")){ series = "SIIMS";}
		else if(name.match("SPL")){ series = "SPL";}
		else if(name.match("SP")){ series = "SP";}
		else if(name.match("TCSVT")){ series = "TCSVT";}	  
		else if(name.match("TCYB")){ series = "TCYB";}	  
		else if(name.match("TGRS")){ series = "TGRS";}	  
		else if(name.match("TIFS")){ series = "TIFS";}	  
		else if(name.match("TIP")){ series = "TIP";}	  
		else if(name.match("TMM")){ series = "TMM";}	  
		else if(name.match("TNNLS")){ series = "TNNLS";}	  
		else if(name.match("TOG")){ series = "TOG";}
		else if(name.match("TSP")){ series = "TSP";}
		else if(name.match("TVCG")){ series = "TVCG";}
		else if(name.match("WACV")){ series = "WACV";}
		
		else if(name.match(/.*Int.*Conf.*3D Vision.*/i)){ series = "3DV";}
		else if(name.match(/.*Access.*/i)){ series = "Access";}
		else if(name.match(/.*AAAI.*Conf.*Artificial.*Intell.*/i)){ series = "AAAI";}
		else if(name.match(/.*App.*Comput.*Harmon.*Anal.*/i)){ series = "ACHA";}
		else if(name.match(/.*arXiv.*/i)){ series = "arXiv";}
		else if(name.match(/.*British.*Machine.*Vis.*Conf.*/i)){ series = "BMVC";}
		else if(name.match(/.*Conf.*Comput.*Vis.*Pattern.*Recognition.*/i)){ series = "CVPR";}
		else if(name.match(/.*Eur.*Conf.*Comput.*Vision.*/i)){ series = "ECCV";}
		else if(name.match(/.*Int.*Conf.*Acoustics.*Speech.*Signal.*/i)){ series = "ICASSP";}
		else if(name.match(/.*Int.*Conf.*Comput.*Vision.*/i)){ series = "ICCV";}
		else if(name.match(/.*Int.*Conf.*Image.*Process.*/i)){ series = "ICIP";}
		else if(name.match(/.*Int.*Conf.*Learn.*Representation.*/i)){ series = "ICLR";}
		else if(name.match(/.*Int.*Conf.*Multimedia.*Expo.*/i)){ series = "ICME";}
		else if(name.match(/.*Int.*Conf.*Mach.*Learn.*/i)){ series = "ICML";}
		else if(name.match(/.*Int.*Joint.*Conf.*Artificial.*Intell.*/i)){ series = "IJCAI";}
		else if(name.match(/.*Int.*J.*Comput.*Vision.*/i)){ series = "IJCV";}
		else if(name.match(/.*Inform.*Sci.*/i)){ series = "IS";}
		else if(name.match(/.*J.*Math.*Imaging.*Vision.*/i)){ series = "JMIV";}
		else if(name.match(/.*J.*Scientific.*Computing.*/i)){ series = "JSC";}
		else if(name.match(/.*Int.*Conf.*Multimedia.*/i)){ series = "MM";}
		else if(name.match(/.*Multiscale.*Model.*Simul.*/i)){ series = "MMS";}
		else if(name.match(/.*Neurocomputing.*/i)){ series = "Neurocomputing";}	  
		else if(name.match(/.*Advances.*Neural.*Inform.*Process.*Syst.*/i)){ series = "NIPS";}
		else if(name.match(/.*Neural.*Networks.*/i)){ series = "NN";}	  
		else if(name.match(/.*Trans.*Pattern.*Anal.*Mach.*Intell.*/i)){ series = "PAMI";}
		else if(name.match(/.*Pattern.*Recognition.*/i)){ series = "PR";}
		else if(name.match(/.*Robotics.*Automation.*Letters.*/i)){ series = "RAL";}
		else if(name.match(/.*SIAM.*Journal.*Imaging.*Sci.*/i)){ series = "SIIMS";}
		else if(name.match(/.*Signal.*Process.*/i)){ series = "SP";}
		else if(name.match(/.*Signal.*Process.*Letters.*/i)){ series = "SPL";}
		else if(name.match(/.*Trans.*Circuits.*Syst.*Video.*Technology.*/i)){ series = "TCSVT";}	  
		else if(name.match(/.*Trans.*Cybernetics.*/i)){ series = "TCYB";}	  
		else if(name.match(/.*Trans.*Geosci.*Remote.*Sens.*/i)){ series = "TGRS";}	  
		else if(name.match(/.*Inform.*Forensics.*Security.*/i)){ series = "TIFS";}	  
		else if(name.match(/.*Trans.*Image.*Process.*/i)){ series = "TIP";}	  
		else if(name.match(/.*Trans.*Multimedia.*/i)){ series = "TMM";}	  
		else if(name.match(/.*Trans.*Neural.*Netw.*Learn.*Syst.*/i)){ series = "TNNLS";}	  
		else if(name.match(/.*Trans.*Graphics.*/i)){ series = "TOG";}
		else if(name.match(/.*Trans.*Signal.*Process.*/i)){ series = "TSP";}
		else if(name.match(/.*Trans.*Vis.*Comput.*Graph.*/i)){ series = "TVCG";}
		else if(name.match(/.*Winter.*Conf.*App.*Comput.*Vision.*/i)){ series = "WACV";}
		else if(name.match(/.*arXiv.*/i)){ series = "arXiv";}
		return series;
	}
    this.updateItem = function (item, operation) {
        //hanmei
        item.addTag('To-Read', 1);
		//let name = item.getField('conferenceName');
		let name="";
		if(item.getField('conferenceName')){name=item.getField('conferenceName')}
		else if(item.getField('publicationTitle')){name=item.getField('publicationTitle')}
		let series=this.getSeries(name);
		item.setField('series',series);
        try { item.saveTx(); } catch (e) {
            Zotero.logError(e);
        }
        this.resetState('initial');
    };
};