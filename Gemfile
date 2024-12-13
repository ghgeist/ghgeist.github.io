source "https://rubygems.org"

# Specify Ruby version for better compatibility
ruby "~> 3.0"

# Update to latest stable Jekyll
gem "jekyll", "~> 4.3.3"

# Add these to address Ruby 3.4.0 warnings
gem "csv"
gem "base64"
gem "bigdecimal"

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Windows needs webrick explicitly added with Ruby 3+
gem "webrick", "~> 1.7"