source "https://rubygems.org"

gem "csv"
gem "base64"
gem "bigdecimal"

# Update Jekyll to latest version
gem "jekyll", "~> 4.3.0"
gem "webrick", "~> 1.7"
gem "stringio", "~> 3.1.2"

# Windows specific gems
gem 'wdm', '>= 0.1.0' if Gem.win_platform?

# Timezone support (required when `timezone` is set in _config.yml)
gem "tzinfo", "~> 2.0"
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-paginate"
  gem "jekyll-sitemap"
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
end 