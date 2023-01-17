import Application from 'dummy/app';
import config from 'dummy/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';

import './assertions/comparisons';
import './assertions/dom';
import './assertions/testdouble';
import './assertions/wait-for';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
