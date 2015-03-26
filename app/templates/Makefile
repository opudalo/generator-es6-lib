REPORTER = spec
COMPILER = js:babel/register
SOURCE = test.js

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--compilers $(COMPILER) \
	  $(SOURCE)

test-w:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--compilers $(COMPILER) \
		--watch \
	  $(SOURCE)

.PHONY: test test-w
